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
import { useRouter } from "next/navigation";
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, Eye } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import RiskBadge from "@/components/ui/RiskBadge";
import Skeleton from "@/components/ui/Skeleton";

const RISK_LEVELS = ["ALL", "LOW", "MEDIUM", "HIGH", "CRITICAL"];

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("ALL");
  const router = useRouter();

  useEffect(() => {
    api.get("/events")
      .then((r) => setEvents(r.data.events ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() =>
    riskFilter === "ALL" ? events : events.filter((e) => e.riskLevel === riskFilter),
    [events, riskFilter]
  );

  const columns = useMemo(() => [
    {
      accessorKey: "user",
      header: "Employee",
      cell: ({ getValue }) => {
        const u = getValue();
        return (
          <div>
            <p className="text-sm text-white font-medium">{u?.fullName ?? "—"}</p>
            <p className="text-xs text-gray-500">{u?.employeeId}</p>
          </div>
        );
      },
    },
    { accessorKey: "eventType", header: "Event Type", cell: ({ getValue }) => <span className="text-xs font-mono text-blue-300">{getValue()}</span> },
    { accessorKey: "resource", header: "Resource", cell: ({ getValue }) => <span className="text-sm text-gray-300 truncate max-w-[140px] block">{getValue()}</span> },
    { accessorKey: "location", header: "Location", cell: ({ getValue }) => <span className="text-sm text-gray-400">{getValue()}</span> },
    {
      accessorKey: "riskScore",
      header: "Risk Score",
      cell: ({ getValue }) => {
        const v = getValue();
        const color = v >= 80 ? "text-red-400" : v >= 50 ? "text-yellow-400" : "text-emerald-400";
        return <span className={`font-bold text-sm ${color}`}>{v}</span>;
      },
    },
    {
      accessorKey: "riskLevel",
      header: "Risk Level",
      cell: ({ getValue }) => <RiskBadge level={getValue()} />,
    },
    {
      accessorKey: "createdAt",
      header: "Time",
      cell: ({ getValue }) => <span className="text-xs text-gray-500">{new Date(getValue()).toLocaleString()}</span>,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <button
          onClick={() => router.push(`/events/${row.original._id}`)}
          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          <Eye size={13} /> View
        </button>
      ),
    },
  ], [router]);

  const table = useReactTable({
    data: filtered,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 15 } },
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">Events</h1>
        <p className="text-sm text-gray-400 mt-0.5">All privileged access events</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">{error}</div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search events…"
            className="w-full bg-[#111827] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {RISK_LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setRiskFilter(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                riskFilter === lvl
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
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
                          className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer select-none whitespace-nowrap"
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
                      <td colSpan={columns.length} className="px-4 py-10 text-center text-gray-500 text-sm">
                        No events found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
              <span className="text-xs text-gray-500">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} — {filtered.length} events
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10 disabled:opacity-30 rounded text-gray-300 transition-colors"
                >
                  Prev
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10 disabled:opacity-30 rounded text-gray-300 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
