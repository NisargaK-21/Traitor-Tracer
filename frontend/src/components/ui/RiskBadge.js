const RISK_STYLES = {
  LOW: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  MEDIUM: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  HIGH: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  CRITICAL: "bg-red-500/20 text-red-400 border border-red-500/30",
};

export default function RiskBadge({ level }) {
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide ${RISK_STYLES[level] ?? RISK_STYLES.LOW}`}>
      {level}
    </span>
  );
}
