"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Zap, Bell, Trophy, ShieldAlert, Building2, ShieldCheck } from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/events", label: "Events", icon: Zap },
  { href: "/alerts", label: "Alerts", icon: Bell },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

const PORTAL_NAV = [
  { href: "/portal", label: "Employee Portal", icon: Building2 },
  { href: "/admin/overview", label: "Admin Overview", icon: ShieldCheck },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 bg-[#0d1526] border-r border-white/10 flex flex-col min-h-screen">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
        <ShieldAlert size={22} className="text-blue-400" />
        <span className="font-bold text-white text-lg tracking-tight">Traitor Tracer</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-3 pb-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Security</p>
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href) && !pathname.startsWith("/dashboard/"));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}

        <div className="pt-4 pb-1">
          <p className="px-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Portal</p>
        </div>

        {PORTAL_NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
