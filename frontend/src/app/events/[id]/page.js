"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Monitor, MapPin, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import RiskBadge from "@/components/ui/RiskBadge";
import Skeleton from "@/components/ui/Skeleton";

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-white/5 last:border-0">
      <span className="text-xs text-gray-500 uppercase tracking-wider w-36 shrink-0">{label}</span>
      <span className="text-sm text-gray-200 text-right">{value ?? "—"}</span>
    </div>
  );
}

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/events/${id}`)
      .then((r) => setEvent(r.data.event))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const riskColor =
    event?.riskScore >= 80 ? "text-red-400" :
    event?.riskScore >= 50 ? "text-yellow-400" : "text-emerald-400";

  return (
    <div className="space-y-5 max-w-4xl">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={15} /> Back to Events
      </button>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">{error}</div>
      )}

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : event ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* Header */}
          <div className="bg-[#111827] border border-white/10 rounded-xl p-5 shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs text-gray-500 font-mono mb-1">{event._id}</p>
                <h1 className="text-lg font-bold text-white">{event.eventType}</h1>
                <p className="text-sm text-gray-400 mt-1">{event.description || "No description"}</p>
              </div>
              <div className="flex items-center gap-3">
                <RiskBadge level={event.riskLevel} />
                <span className={`text-3xl font-black ${riskColor}`}>{event.riskScore}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Info */}
            <div className="bg-[#111827] border border-white/10 rounded-xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Monitor size={15} className="text-blue-400" />
                <h2 className="text-sm font-semibold text-gray-300">Event Details</h2>
              </div>
              <InfoRow label="Resource" value={event.resource} />
              <InfoRow label="IP Address" value={event.ipAddress} />
              <InfoRow label="Device" value={event.device} />
              <InfoRow label="Location" value={event.location} />
              <InfoRow label="Timestamp" value={new Date(event.createdAt).toLocaleString()} />
            </div>

            {/* User Info */}
            <div className="bg-[#111827] border border-white/10 rounded-xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <User size={15} className="text-purple-400" />
                <h2 className="text-sm font-semibold text-gray-300">User</h2>
              </div>
              <InfoRow label="Full Name" value={event.user?.fullName} />
              <InfoRow label="Employee ID" value={event.user?.employeeId} />
              <InfoRow label="Email" value={event.user?.email} />
              <InfoRow label="Role" value={event.user?.role} />
            </div>
          </div>

          {/* AI Risk Analysis */}
          <div className="bg-[#111827] border border-white/10 rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={15} className="text-yellow-400" />
              <h2 className="text-sm font-semibold text-gray-300">AI Risk Analysis</h2>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 bg-white/5 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Risk Score</p>
                <p className={`text-4xl font-black ${riskColor}`}>{event.riskScore}</p>
                <p className="text-xs text-gray-500 mt-1">out of 100</p>
              </div>
              <div className="flex-1 bg-white/5 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Risk Level</p>
                <div className="flex justify-center mt-2">
                  <RiskBadge level={event.riskLevel} />
                </div>
              </div>
              <div className="flex-1 bg-white/5 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Anomaly</p>
                <div className="flex justify-center mt-2">
                  {event.anomaly ? (
                    <span className="flex items-center gap-1 text-red-400 text-sm font-semibold"><AlertTriangle size={14} /> Yes</span>
                  ) : (
                    <span className="flex items-center gap-1 text-emerald-400 text-sm font-semibold"><CheckCircle size={14} /> No</span>
                  )}
                </div>
              </div>
            </div>
            {event.reasons?.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Risk Reasons</p>
                <div className="space-y-2">
                  {event.reasons.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                      <AlertTriangle size={13} className="text-red-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-red-300">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Metadata */}
          {event.metadata && Object.keys(event.metadata).length > 0 && (
            <div className="bg-[#111827] border border-white/10 rounded-xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={15} className="text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-300">Metadata</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(event.metadata).map(([k, v]) => (
                  <div key={k} className="bg-white/5 rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-500 capitalize">{k}</p>
                    <p className="text-sm text-white font-medium mt-0.5">{String(v)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <p className="text-gray-500 text-sm">Event not found.</p>
      )}
    </div>
  );
}
