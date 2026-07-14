"use client";
import { useEffect, useState } from "react";
import { Users, Zap, Bell, ShieldAlert } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import api from "@/lib/api";
import StatCard from "@/components/ui/StatCard";
import Skeleton from "@/components/ui/Skeleton";

const COLORS = ["#10B981", "#F59E0B", "#F97316", "#EF4444"];

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/dashboard/overview")
      .then((r) => setData(r.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const pieData = data
    ? [
        { name: "Low", value: data.totalEvents - data.highRiskEvents },
        { name: "High", value: data.highRiskEvents },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Overview</h1>
        <p className="text-sm text-gray-400 mt-0.5">Real-time security posture</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Users" value={data?.totalUsers} color="text-blue-400" loading={loading} />
        <StatCard icon={Zap} label="Total Events" value={data?.totalEvents} color="text-purple-400" loading={loading} />
        <StatCard icon={Bell} label="Total Alerts" value={data?.totalAlerts} color="text-yellow-400" loading={loading} />
        <StatCard icon={ShieldAlert} label="High Risk Events" value={data?.highRiskEvents} color="text-red-400" loading={loading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111827] border border-white/10 rounded-xl p-5 shadow-lg"
        >
          <h2 className="text-sm font-semibold text-gray-300 mb-4">Event Risk Distribution</h2>
          {loading ? (
            <Skeleton className="h-52 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#1f2937", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f1f5f9" }}
                />
                <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-[#111827] border border-white/10 rounded-xl p-5 shadow-lg"
        >
          <h2 className="text-sm font-semibold text-gray-300 mb-4">System Summary</h2>
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { label: "Monitored Users", value: data?.totalUsers, color: "bg-blue-500" },
                { label: "Events Logged", value: data?.totalEvents, color: "bg-purple-500" },
                { label: "Active Alerts", value: data?.totalAlerts, color: "bg-yellow-500" },
                { label: "High Risk Events", value: data?.highRiskEvents, color: "bg-red-500" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${color}`} />
                    <span className="text-sm text-gray-300">{label}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{value?.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
