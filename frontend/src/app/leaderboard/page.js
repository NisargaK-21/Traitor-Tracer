"use client";
import { useEffect, useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import api from "@/lib/api";
import Skeleton from "@/components/ui/Skeleton";

function RiskBar({ score }) {
  const pct = Math.min(100, Math.round(score));
  const color = pct >= 70 ? "bg-red-500" : pct >= 40 ? "bg-yellow-500" : "bg-emerald-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-white/10 rounded-full h-1.5 w-24">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-xs font-bold ${pct >= 70 ? "text-red-400" : pct >= 40 ? "text-yellow-400" : "text-emerald-400"}`}>
        {score.toFixed(1)}
      </span>
    </div>
  );
}

const MEDAL = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    api.get("/dashboard/leaderboard")
      .then((r) => setData(r.data.leaderboard ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const columns = useMemo(() => [
    {
      id: "rank",
      header: "#",
      cell: ({ row }) => {
        const rank = row.index + 1;
        return <span className="text-sm font-bold text-gray-400">{MEDAL[rank - 1] ?? rank}</span>;
      },
    },
    {
      accessorKey: "_id",
      header: "Employee ID",
      cell: ({ getValue }) => <span className="text-sm font-mono text-blue-300">{getValue() ?? "—"}</span>,
    },
    {
      accessorKey: "totalEvents",
      header: "Events",
      cell: ({ getValue }) => <span className="text-sm text-gray-300">{getValue()}</span>,
    },
    {
      accessorKey: "averageRisk",
      header: "Avg Risk Score",
      cell: ({ getValue }) => <RiskBar score={getValue()} />,
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
      sorting: [{ id: "averageRisk", desc: true }],
    },
  });

  const chartData = data.slice(0, 10).map((d) => ({
    id: d._id ?? "?",
    score: parseFloat(d.averageRisk.toFixed(1)),
  }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">Risk Leaderboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Employees ranked by average risk score</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">{error}</div>
      )}

      {!loading && chartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] border border-white/10 rounded-xl p-5 shadow-lg"
        >
          <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <Trophy size={14} className="text-yellow-400" /> Top 10 Risk Scores
          </h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="id" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ background: "#1f2937", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f1f5f9" }}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {chartData.map((d, i) => (
                  <Cell key={i} fill={d.score >= 70 ? "#EF4444" : d.score >= 40 ? "#F59E0B" : "#10B981"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search by employee ID…"
          className="w-full bg-[#111827] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden shadow-lg"
      >
        {loading ? (
          <div className="p-4 space-y-3">
            {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id} className="border-b border-white/10">
                      {hg.headers.map((h) => (
                        <th
                          key={h.id}
                          onClick={h.column.getToggleSortingHandler()}
                          className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-1">
                            {flexRender(h.column.columnDef.header, h.getContext())}
                            {h.column.getCanSort() && (
                              h.column.getIsSorted() === "asc" ? <ChevronUp size={12} /> :
                              h.column.getIsSorted() === "desc" ? <ChevronDown size={12} /> :
                              <ChevronsUpDown size={12} className="opacity-30" />
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {table.getRowModel().rows.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-10 text-center text-gray-500 text-sm">No data found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
              <span className="text-xs text-gray-500">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} — {data.length} employees
              </span>
              <div className="flex gap-2">
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10 disabled:opacity-30 rounded text-gray-300 transition-colors">Prev</button>
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10 disabled:opacity-30 rounded text-gray-300 transition-colors">Next</button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
