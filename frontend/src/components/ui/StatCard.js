"use client";
import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, color = "text-blue-400", loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111827] border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:border-white/20 transition-colors shadow-lg"
    >
      <div className={`p-3 rounded-lg bg-white/5 ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
        {loading ? (
          <div className="h-7 w-20 bg-white/5 animate-pulse rounded mt-1" />
        ) : (
          <p className="text-2xl font-bold text-white mt-0.5">{value?.toLocaleString() ?? "—"}</p>
        )}
      </div>
    </motion.div>
  );
}
