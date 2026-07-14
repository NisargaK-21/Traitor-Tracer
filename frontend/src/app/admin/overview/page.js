"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert, Bell, Trophy, Activity,
  CheckCheck, XCircle, AlertTriangle, Users, Zap, RefreshCw
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "@/lib/api";
import RiskBadge from "@/components/ui/RiskBadge";
import Skeleton from "@/components/ui/Skeleton";

export default function AdminOverviewPage() {
  const [overview, setOverview] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState({});
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchAll = useCallback(async () => {
    try {
      const [ovRes, alRes, lbRes, evRes] = await Promise.all([
        api.get("/dashboard/overview"),
        api.get("/alerts"),
        api.get("/dashboard/leaderboard"),
        api.get("/events"),
      ]);
      setOverview(ovRes.data);
      setAlerts(alRes.data.alerts ?? []);
      setLeaderboard(lbRes.data.leaderboard ?? []);
      setEvents(evRes.data.events ?? []);
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 15000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  const patch = async (id, action) => {
    setActing((p) => ({ ...p, [id]: action }));
    try {
      const res = await api.patch(`/alerts/${id}/${action}`);
      setAlerts((prev) => prev.map((a) => a._id === id ? { ...a, ...res.data.alert } : a));
    } finally {
      setActing((p) => ({ ...p, [id]: null }));
    }
  };

  // Build timeline chart data from events (last 10 by time)
  const timelineData = events.slice(0, 20).reverse().map((e, i) => ({
    name: `E${i + 1}`,
    risk: e.riskScore,
  }));

  const activeAlerts = alerts.filter((a) => !a.resolved);
  const top5 = leaderboard.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert size={20} className="text-blue-400" /> Admin Overview
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Last refreshed: {lastRefresh.toLocaleTimeString()} · Auto-refreshes every 15s
          </p>
        </div>
        <button
          onClick={fetchAll}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg transition-colors"
        >
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Users", value: overview?.totalUsers, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Total Events", value: overview?.totalEvents, icon: Zap, color: "text-purple-400", bg: "bg-purple-500/10" },
          { label: "Active Alerts", value: activeAlerts.length, icon: Bell, color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { label: "High Risk Events", value: overview?.highRiskEvents, icon: ShieldAlert, color: "text-red-400", bg: "bg-red-500/10" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`${bg} border border-white/10 rounded-xl p-4 flex items-center gap-3`}>
            <Icon size={20} className={color} />
            <div>
              <p className="text-xs text-gray-500">{label}</p>
              {loading ? <div className="h-6 w-12 bg-white/5 animate-pulse rounded mt-1" /> :
                <p className="text-xl font-bold text-white">{value ?? 0}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Live Alert Feed */}
        <div className="lg:col-span-2 bg-[#111827] border border-white/10 rounded-xl overflow-hidden shadow-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Bell size={14} className="text-yellow-400" /> Live Alert Feed
            </h2>
            <span className="text-xs text-gray-600">{activeAlerts.length} active</span>
          </div>
          <div className="divide-y divide-white/5 max-h-80 overflow-y-auto">
            {loading ? (
              <div className="p-4 space-y-3">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
              </div>
            ) : activeAlerts.length === 0 ? (
              <div className="py-10 text-center text-gray-600 text-sm">No active alerts</div>
            ) : (
              <AnimatePresence>
                {activeAlerts.map((alert) => (
                  <motion.div
                    key={alert._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-4 py-3 flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <AlertTriangle size={14} className="text-red-400 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-white truncate">
                            {alert.user?.fullName ?? alert.user?.employeeId ?? "Unknown"}
                          </span>
                          <RiskBadge level={alert.riskLevel} />
                          {alert.acknowledged && (
                            <span className="text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-1.5 py-0.5 rounded">ACK</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{alert.reason}</p>
                        <p className="text-xs text-gray-700">{new Date(alert.createdAt).toLocaleTimeString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-lg font-black text-red-400">{alert.riskScore}</span>
                      {!alert.acknowledged && (
                        <button
                          onClick={() => patch(alert._id, "acknowledge")}
                          disabled={!!acting[alert._id]}
                          title="Acknowledge"
                          className="p-1.5 text-yellow-400 hover:bg-yellow-500/10 rounded transition-colors disabled:opacity-50"
                        >
                          <Bell size={13} />
                        </button>
                      )}
                      <button
                        onClick={() => patch(alert._id, "resolve")}
                        disabled={!!acting[alert._id]}
                        title="Resolve"
                        className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded transition-colors disabled:opacity-50"
                      >
                        <CheckCheck size={13} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Risk Leaderboard */}
        <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden shadow-lg">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <Trophy size={14} className="text-yellow-400" />
            <h2 className="text-sm font-semibold text-gray-300">Top Risk Users</h2>
          </div>
          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-4 space-y-3">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
              </div>
            ) : top5.length === 0 ? (
              <div className="py-10 text-center text-gray-600 text-sm">No data yet</div>
            ) : (
              top5.map((entry, i) => {
                const score = entry.averageRisk;
                const color = score >= 70 ? "text-red-400" : score >= 40 ? "text-yellow-400" : "text-emerald-400";
                const bar = score >= 70 ? "bg-red-500" : score >= 40 ? "bg-yellow-500" : "bg-emerald-500";
                return (
                  <div key={entry._id ?? i} className="px-4 py-3 flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-4">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-gray-300 truncate">{entry._id ?? "—"}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-white/10 rounded-full h-1">
                          <div className={`h-1 rounded-full ${bar}`} style={{ width: `${Math.min(100, score)}%` }} />
                        </div>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${color}`}>{score.toFixed(1)}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Per-User Behavior Timeline */}
      <div className="bg-[#111827] border border-white/10 rounded-xl p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={14} className="text-blue-400" />
          <h2 className="text-sm font-semibold text-gray-300">Risk Score Timeline (Last 20 Events)</h2>
        </div>
        {loading ? (
          <Skeleton className="h-40 w-full" />
        ) : timelineData.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-gray-600 text-sm">No events recorded yet</div>
        ) : (
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fill: "#4b5563", fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fill: "#4b5563", fontSize: 10 }} />
              <Tooltip
                contentStyle={{ background: "#1f2937", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f1f5f9", fontSize: 12 }}
              />
              <Area type="monotone" dataKey="risk" stroke="#2563EB" fill="url(#riskGrad)" strokeWidth={2} dot={{ fill: "#2563EB", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
