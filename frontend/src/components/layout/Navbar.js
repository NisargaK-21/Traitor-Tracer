"use client";
import { Bell, LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { profile, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="h-14 bg-[#0d1526] border-b border-white/10 flex items-center justify-between px-6 shrink-0">
      <p className="text-sm text-gray-400">
        Security Operations Center
      </p>
      <div className="flex items-center gap-4">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center">
            <User size={14} className="text-blue-400" />
          </div>
          <span className="hidden sm:block">{profile?.fullName ?? profile?.email ?? "Analyst"}</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-red-400 transition-colors"
          title="Logout"
        >
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}
