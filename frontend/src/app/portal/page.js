"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCheck, FileX, Eye, CheckCircle, Clock,
  User, Loader2, X, ShieldAlert, Download, UserSearch,
  FileText, AlertTriangle, Wifi
} from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

const LOANS = [
  {
    id: "LOAN-2024-0041",
    applicant: "Rajesh Kumar",
    amount: 1500000,
    purpose: "Home Renovation",
    tenure: "5 years",
    cibil: 782,
    income: 85000,
    status: "PENDING",
    appliedOn: "2024-12-01",
    branch: "Chennai Central",
  },
  {
    id: "LOAN-2024-0052",
    applicant: "Priya Nair",
    amount: 800000,
    purpose: "Education Loan",
    tenure: "3 years",
    cibil: 810,
    income: 60000,
    status: "PENDING",
    appliedOn: "2024-12-03",
    branch: "Bangalore MG Road",
  },
  {
    id: "LOAN-2024-0063",
    applicant: "Arjun Mehta",
    amount: 3000000,
    purpose: "Business Expansion",
    tenure: "7 years",
    cibil: 695,
    income: 200000,
    status: "PENDING",
    appliedOn: "2024-12-05",
    branch: "Mumbai Andheri",
  },
  {
    id: "LOAN-2024-0074",
    applicant: "Sunita Sharma",
    amount: 500000,
    purpose: "Medical Emergency",
    tenure: "2 years",
    cibil: 740,
    income: 45000,
    status: "PENDING",
    appliedOn: "2024-12-06",
    branch: "Delhi Connaught Place",
  },
  {
    id: "LOAN-2024-0085",
    applicant: "Vikram Singh",
    amount: 2500000,
    purpose: "Vehicle Purchase",
    tenure: "6 years",
    cibil: 760,
    income: 150000,
    status: "PENDING",
    appliedOn: "2024-12-07",
    branch: "Hyderabad Banjara Hills",
  },
  {
    id: "LOAN-2024-0096",
    applicant: "Meena Iyer",
    amount: 1200000,
    purpose: "Home Purchase",
    tenure: "10 years",
    cibil: 820,
    income: 95000,
    status: "PENDING",
    appliedOn: "2024-12-08",
    branch: "Pune Koregaon Park",
  },
];

function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Simulates an off-hours session from an unusual location (for demo)
const SUSPICIOUS_PARAMS = {
  hour: 2,
  failedLogins: 8,
  downloads: 180,
  country: "Russia",
  ip: "185.220.101.45",
  device: "Linux",
  vpn: true,
  usbInserted: true,
  adminAction: false,
};

const NORMAL_PARAMS = {
  hour: new Date().getHours(),
  failedLogins: 0,
  downloads: 2,
  country: "India",
  ip: "10.10.1.45",
  device: "Windows",
  vpn: false,
  usbInserted: false,
  adminAction: false,
};

function RiskResult({ result, onDismiss }) {
  if (!result) return null;
  const isHigh = result.riskScore >= 70;
  const isMed = result.riskScore >= 40 && result.riskScore < 70;
  const colorClass = isHigh
    ? "bg-red-500/10 border-red-500/30 text-red-300"
    : isMed
    ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-300"
    : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${colorClass}`}
    >
      <AlertTriangle size={15} className="mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold">AI Risk Score: {result.riskScore}</span>
          <span className="text-xs opacity-70 font-mono">{result.riskLevel}</span>
        </div>
      </div>
      <button onClick={onDismiss} className="opacity-50 hover:opacity-100 shrink-0">
        <X size={13} />
      </button>
    </motion.div>
  );
}

function LoanDetailModal({ loan, onClose, onApprove, onReject, onAction, loading, lastRisk }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#111827] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div>
            <p className="text-xs text-gray-500 font-mono">{loan.id}</p>
            <h2 className="text-base font-bold text-white mt-0.5">Loan Application</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4 space-y-3">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <User size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{loan.applicant}</p>
              <p className="text-xs text-gray-500">{loan.branch}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-gray-500">CIBIL Score</p>
              <p className={`text-sm font-bold ${loan.cibil >= 750 ? "text-emerald-400" : loan.cibil >= 700 ? "text-yellow-400" : "text-red-400"}`}>
                {loan.cibil}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Loan Amount", value: formatINR(loan.amount) },
              { label: "Purpose", value: loan.purpose },
              { label: "Tenure", value: loan.tenure },
              { label: "Monthly Income", value: formatINR(loan.income) },
              { label: "Applied On", value: loan.appliedOn },
              { label: "Branch", value: loan.branch },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 rounded-lg px-3 py-2">
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-sm text-white font-medium mt-0.5 truncate">{value}</p>
              </div>
            ))}
          </div>

          {/* Secondary privileged actions — each fires a distinct event the AI scores */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => onAction(loan, "EXPORT_DATA", "export")}
              disabled={!!loading}
              className="flex flex-col items-center gap-1.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 text-orange-400 text-xs font-medium py-2.5 rounded-xl transition-colors disabled:opacity-50"
            >
              {loading === "export" ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              Export Details
            </button>
            <button
              onClick={() => onAction(loan, "VIEW_CUSTOMER", "profile")}
              disabled={!!loading}
              className="flex flex-col items-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-xs font-medium py-2.5 rounded-xl transition-colors disabled:opacity-50"
            >
              {loading === "profile" ? <Loader2 size={14} className="animate-spin" /> : <UserSearch size={14} />}
              View Profile
            </button>
            <button
              onClick={() => onAction(loan, "VIEW_ACCOUNT", "docs")}
              disabled={!!loading}
              className="flex flex-col items-center gap-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 text-xs font-medium py-2.5 rounded-xl transition-colors disabled:opacity-50"
            >
              {loading === "docs" ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
              Request Docs
            </button>
          </div>

          {/* Inline AI risk result after secondary actions */}
          <AnimatePresence>
            {lastRisk && (
              <RiskResult result={lastRisk.aiResult} onDismiss={lastRisk.onDismiss} />
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-3 px-5 py-4 border-t border-white/10">
          <button
            onClick={() => onReject(loan)}
            disabled={!!loading}
            className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-50"
          >
            {loading === "reject" ? <Loader2 size={15} className="animate-spin" /> : <FileX size={15} />}
            Reject
          </button>
          <button
            onClick={() => onApprove(loan)}
            disabled={!!loading}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-50"
          >
            {loading === "approve" ? <Loader2 size={15} className="animate-spin" /> : <FileCheck size={15} />}
            Approve
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function PortalPage() {
  const { profile } = useAuth();
  const [loans, setLoans] = useState(() => {
    if (typeof window === "undefined") return LOANS;
    try {
      const saved = sessionStorage.getItem("portal_loans");
      return saved ? JSON.parse(saved) : LOANS;
    } catch {
      return LOANS;
    }
  });
  const [selected, setSelected] = useState(null);
  const [modalLoading, setModalLoading] = useState(null);
  const [toast, setToast] = useState(null);
  // Toggle simulates an off-hours/unusual-location session context for demo
  const [suspiciousSession, setSuspiciousSession] = useState(false);
  const [lastRisk, setLastRisk] = useState(null);

  const updateLoans = (updater) => {
    setLoans((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      try { sessionStorage.setItem("portal_loans", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const displayName =
    profile?.fullName && profile.fullName !== "Unknown User"
      ? profile.fullName
      : profile?.email?.split("@")[0] ?? "Employee";

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fireEvent = async (loan, eventType, description) => {
    const params = suspiciousSession ? SUSPICIOUS_PARAMS : NORMAL_PARAMS;
    const payload = {
      employeeId: profile?.employeeId,
      role: profile?.role ?? "EMPLOYEE",
      eventType,
      resource: loan.id,
      description,
      ...params,
      adminAction: eventType === "APPROVE_LOAN" && suspiciousSession,
    };
    return api.post("/events", payload);
  };

  const handleApprove = async (loan) => {
    setModalLoading("approve");
    try {
      await fireEvent(loan, "APPROVE_LOAN", `Approved loan application for ${loan.applicant}`);
    } catch (err) {
      // If backend/AI is unreachable, still update UI locally so the button works
      console.error("Approve event log failed:", err?.response?.data?.message ?? err.message);
    }
    updateLoans((p) => p.map((l) => l.id === loan.id ? { ...l, status: "APPROVED" } : l));
    setSelected(null);
    setLastRisk(null);
    setModalLoading(null);
    showToast(`Loan ${loan.id} approved successfully`, "success");
  };

  const handleReject = async (loan) => {
    setModalLoading("reject");
    try {
      await fireEvent(loan, "REJECT_LOAN", `Rejected loan application for ${loan.applicant}`);
    } catch (err) {
      console.error("Reject event log failed:", err?.response?.data?.message ?? err.message);
    }
    updateLoans((p) => p.map((l) => l.id === loan.id ? { ...l, status: "REJECTED" } : l));
    setSelected(null);
    setLastRisk(null);
    setModalLoading(null);
    showToast(`Loan ${loan.id} rejected`, "error");
  };

  const handleAction = async (loan, eventType, loadingKey) => {
    setModalLoading(loadingKey);
    setLastRisk(null);
    const descMap = {
      EXPORT_DATA: `Exported full customer details for ${loan.applicant} (${loan.id})`,
      VIEW_CUSTOMER: `Viewed full profile of ${loan.applicant}`,
      VIEW_ACCOUNT: `Requested document copies for ${loan.applicant} (${loan.id})`,
    };
    try {
      const res = await fireEvent(loan, eventType, descMap[eventType]);
      const aiResult = res.data?.aiResult;
      if (aiResult) {
        setLastRisk({ aiResult, onDismiss: () => setLastRisk(null) });
      }
      const labelMap = { EXPORT_DATA: "Export", VIEW_CUSTOMER: "Profile view", VIEW_ACCOUNT: "Doc request" };
      showToast(
        `${labelMap[eventType]} logged — Risk: ${aiResult?.riskScore ?? "?"}`,
        aiResult?.riskScore >= 70 ? "error" : "success"
      );
    } catch {
      showToast("Failed to log action", "error");
    } finally {
      setModalLoading(null);
    }
  };

  const pending = loans.filter((l) => l.status === "PENDING");
  const processed = loans.filter((l) => l.status !== "PENDING");

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium shadow-xl ${
              toast.type === "success"
                ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                : "bg-red-500/20 border-red-500/30 text-red-300"
            }`}
          >
            {toast.type === "success" ? <CheckCircle size={15} /> : <FileX size={15} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Employee Portal</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Welcome,{" "}
            <span className="text-blue-400 font-medium capitalize">{displayName}</span>
            {" · "}
            <span className="text-gray-500 font-mono text-xs">{profile?.employeeId}</span>
            {" · "}
            <span className="text-purple-400">{profile?.role ?? "EMPLOYEE"}</span>
            {" · "}
            <span className="text-gray-500">India</span>
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Session context toggle — simulates off-hours/unusual-location access for demo */}
          <button
            onClick={() => { setSuspiciousSession((v) => !v); setLastRisk(null); }}
            title="Simulates an off-hours session from an unusual location (demo only)"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              suspiciousSession
                ? "bg-red-500/20 border-red-500/40 text-red-400"
                : "bg-white/5 border-white/10 text-gray-500 hover:text-gray-300"
            }`}
          >
            {suspiciousSession ? <Wifi size={13} /> : <ShieldAlert size={13} />}
            {suspiciousSession ? "Off-Hours Session" : "Normal Session"}
          </button>

          <div className="flex gap-2 text-center">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-3 py-2">
              <p className="text-lg font-bold text-yellow-400">{pending.length}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2">
              <p className="text-lg font-bold text-emerald-400">{loans.filter((l) => l.status === "APPROVED").length}</p>
              <p className="text-xs text-gray-500">Approved</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
              <p className="text-lg font-bold text-red-400">{loans.filter((l) => l.status === "REJECTED").length}</p>
              <p className="text-xs text-gray-500">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Off-hours session warning banner */}
      <AnimatePresence>
        {suspiciousSession && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-300 flex items-start gap-2"
          >
            <Wifi size={15} className="shrink-0 mt-0.5" />
            <span>
              <strong>Off-Hours Session active.</strong>{" "}
              Simulating access at 2AM from an unusual location (VPN · Russia · USB device detected · 8 prior failed logins).
              Any action taken now will be scored as high-risk by the AI engine.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pending Loans */}
      {pending.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Clock size={14} className="text-yellow-400" /> Pending Applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pending.map((loan) => (
              <motion.div
                key={loan.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-[#111827] border rounded-xl p-4 transition-colors hover:border-blue-500/30 ${
                  suspiciousSession ? "border-red-500/20" : "border-white/10"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-mono text-gray-500">{loan.id}</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{loan.applicant}</p>
                    <p className="text-xs text-gray-500">{loan.purpose} · {loan.branch}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-white">{formatINR(loan.amount)}</p>
                    <p className="text-xs text-gray-500">{loan.tenure}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-600">CIBIL</p>
                      <p className={`text-sm font-bold ${loan.cibil >= 750 ? "text-emerald-400" : loan.cibil >= 700 ? "text-yellow-400" : "text-red-400"}`}>
                        {loan.cibil}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Income/mo</p>
                      <p className="text-sm font-medium text-gray-300">{formatINR(loan.income)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelected(loan); setLastRisk(null); }}
                    className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Eye size={12} /> Review
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Processed Loans */}
      {processed.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-300">Processed Applications</h2>
          <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  {["Loan ID", "Applicant", "Amount", "Purpose", "Status"].map((h) => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {processed.map((loan) => (
                  <tr key={loan.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-400">{loan.id}</td>
                    <td className="px-4 py-3 text-sm text-white">{loan.applicant}</td>
                    <td className="px-4 py-3 text-sm text-white font-medium">{formatINR(loan.amount)}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{loan.purpose}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                        loan.status === "APPROVED"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}>
                        {loan.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {pending.length === 0 && processed.length === LOANS.length && (
        <div className="text-center py-16 text-gray-500">
          <CheckCircle size={32} className="mx-auto mb-3 text-emerald-500/40" />
          <p className="text-sm">All loan applications have been processed.</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <LoanDetailModal
            loan={selected}
            onClose={() => { setSelected(null); setLastRisk(null); }}
            onApprove={handleApprove}
            onReject={handleReject}
            onAction={handleAction}
            loading={modalLoading}
            lastRisk={lastRisk}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
