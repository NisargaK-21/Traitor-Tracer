"use client";
import { useEffect, useState } from "react";
import { Bell, CheckCheck, XCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import RiskBadge from "@/components/ui/RiskBadge";
import Skeleton from "@/components/ui/Skeleton";

const STATUS_FILTER = ["ALL", "ACTIVE", "ACKNOWLEDGED", "RESOLVED"];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [acting, setActing] = useState({});

  useEffect(() => {
    api.get("/alerts")
      .then((r) => setAlerts(r.data.alerts ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const patch = async (id, action) => {
    setActing((p) => ({ ...p, [id]: action }));
    try {
      const res = await api.patch(`/alerts/${id}/${action}`);
      const updated = res.data.alert;
      setAlerts((prev) => prev.map((a) => (a._id === id ? { ...a, ...updated } : a)));
    } catch (e) {
      setError(e.message);
    } finally {
      setActing((p) => ({ ...p, [id]: null }));
    }
  };

  const visible = alerts.filter((a) => {
    if (filter === "ACTIVE") return !a.acknowledged && !a.resolved;
    if (filter === "ACKNOWLEDGED") return a.acknowledged && !a.resolved;
    if (filter === "RESOLVED") return a.resolved;
    return true;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">Alerts</h1>
        <p className="text-sm text-gray-400 mt-0.5">High-risk activity alerts</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">{error}</div>
      )}

      <div className="flex gap-2 flex-wrap">
        {STATUS_FILTER.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === f ? "bg-blue-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {visible.length === 0 && (
              <p className="text-gray-500 text-sm py-8 text-center">No alerts found.</p>
            )}
            {visible.map((alert) => (
              <motion.div
                key={alert._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`bg-[#111827] border rounded-xl p-4 shadow-lg transition-colors ${
                  alert.resolved
                    ? "border-emerald-500/20 opacity-60"
                    : alert.acknowledged
                    ? "border-yellow-500/20"
                    : "border-red-500/30"
                }`}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 p-2 rounded-lg ${alert.resolved ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
                      {alert.resolved
                        ? <CheckCheck size={16} className="text-emerald-400" />
                        : <AlertTriangle size={16} className="text-red-400" />
                      }
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-white">
                          {alert.user?.fullName ?? "Unknown"}
                        </span>
                        <span className="text-xs text-gray-500">{alert.user?.employeeId}</span>
                        <RiskBadge level={alert.riskLevel} />
                        {alert.acknowledged && !alert.resolved && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded">Acknowledged</span>
                        )}
                        {alert.resolved && (
                          <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">Resolved</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 max-w-xl">{alert.reason}</p>
                      <p className="text-xs text-gray-600 mt-1">{new Date(alert.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-2xl font-black text-red-400">{alert.riskScore}</span>
                    {!alert.resolved && (
                      <>
                        {!alert.acknowledged && (
                          <button
                            onClick={() => patch(alert._id, "acknowledge")}
                            disabled={!!acting[alert._id]}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg transition-colors disabled:opacity-50"
                          >
                            <Bell size={12} />
                            {acting[alert._id] === "acknowledge" ? "…" : "Acknowledge"}
                          </button>
                        )}
                        <button
                          onClick={() => patch(alert._id, "resolve")}
                          disabled={!!acting[alert._id]}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <XCircle size={12} />
                          {acting[alert._id] === "resolve" ? "…" : "Resolve"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
