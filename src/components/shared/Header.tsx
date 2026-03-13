"use client";

import Link from "next/link";
import { Bell, Users } from "lucide-react";
import type { UserRole } from "@/types/attendance";

interface HeaderProps {
  activeRole: UserRole;
  userInitials?: string;
}

const roles: { key: UserRole; label: string; href: string }[] = [
  { key: "employee", label: "Employee", href: "/attendance" },
  { key: "manager", label: "Manager", href: "/attendance/manager" },
  { key: "hr_admin", label: "HR Admin", href: "/attendance/admin" },
];

export function Header({ activeRole, userInitials = "RK" }: HeaderProps) {
  return (
    <header className="flex items-center justify-between h-14 px-6 bg-white border-b border-[#e5e5e5] shrink-0">
      {/* Left: Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-b from-[#055cac] to-[#23a5e6] flex items-center justify-center">
          <Users className="w-4 h-4 text-white" />
        </div>
        <span className="font-sora text-base font-semibold text-[#242424]">
          QuadraPeople
        </span>
      </div>

      {/* Center: Role Tabs */}
      <div className="flex items-center bg-[#f5f5f5] rounded-[25px] p-1 gap-0.5">
        {roles.map((role) => (
          <Link
            key={role.key}
            href={role.href}
            className={`px-5 py-1.5 rounded-[20px] font-sora text-xs transition-all ${
              activeRole === role.key
                ? "bg-white shadow-[0_1px_4px_rgba(0,0,0,0.1)] text-[#242424] font-semibold"
                : "text-[#4b5563] hover:text-[#242424]"
            }`}
          >
            {role.label}
          </Link>
        ))}
      </div>

      {/* Right: Bell + Avatar */}
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-[#616161]" />
        <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#055cac] to-[#23a5e6] flex items-center justify-center">
          <span className="font-sora text-[11px] font-semibold text-white">
            {userInitials}
          </span>
        </div>
      </div>
    </header>
  );
}
