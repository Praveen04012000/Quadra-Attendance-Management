"use client";

import { ChevronDown, MapPin, Clock } from "lucide-react";
import {
  Header,
  StatCard,
  StatusBadge,
  getAttendanceLabel,
  getAttendanceVariant,
} from "@/components/shared";
import {
  currentUser,
  shiftTimer,
  employeeStats,
  leaveBalances,
  calendarDays,
} from "@/data/mockData";

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const calendarStatusColors: Record<string, string> = {
  present: "bg-[#107c10] text-white",
  absent: "bg-[#c50f1f] text-white",
  late: "bg-[#f59e0b] text-white",
  leave: "bg-[#055cac] text-white",
  weekend: "bg-[#f5f5f5] text-[#9ca3af]",
  holiday: "bg-[#ebebeb] text-[#616161]",
  future: "bg-white text-[#242424] border border-[#e5e7eb]",
};

function ShiftTimerCircle() {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (shiftTimer.progressPercent / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[180px] h-[180px]">
        <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
          <circle
            cx="90" cy="90" r={radius}
            fill="none" stroke="#e5e7eb" strokeWidth="10"
          />
          <circle
            cx="90" cy="90" r={radius}
            fill="none" stroke="url(#gradient)" strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#055cac" />
              <stop offset="100%" stopColor="#23a5e6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-sora text-[22px] font-bold text-[#242424]">
            {shiftTimer.hoursWorked}
          </span>
          <span className="font-sora text-[11px] text-[#616161]">
            of {shiftTimer.totalHours}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-[11px] font-sora text-[#616161]">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>In: {shiftTimer.checkInTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Out: {shiftTimer.expectedCheckOut}</span>
        </div>
      </div>
    </div>
  );
}

export function EmployeeDashboard() {
  return (
    <div className="flex flex-col w-[1440px] h-[900px] bg-[#f5f5f5]">
      <Header activeRole="employee" />

      {/* Header Row */}
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h1 className="font-sora text-[22px] font-bold text-[#242424]">
            Good Morning, {currentUser.name.split(" ")[0]}
          </h1>
          <p className="font-sora text-[13px] text-[#616161] mt-0.5">
            {currentUser.department} &middot; {currentUser.employeeId}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-[#d1d1d1] rounded-xl px-3.5 py-2 cursor-pointer">
            <span className="font-sora text-[13px] text-[#242424]">March 2025</span>
            <ChevronDown className="w-4 h-4 text-[#616161]" />
          </div>
          <StatusBadge label="Working" variant="success" size="md" />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="flex gap-4 px-8">
        {employeeStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex gap-4 px-8 mt-4 flex-1 min-h-0">
        {/* Left: Shift Timer + Location */}
        <div className="w-[320px] flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] p-5 flex flex-col items-center">
            <h3 className="font-sora text-base font-semibold text-[#242424] self-start mb-4">
              Today&apos;s Shift
            </h3>
            <ShiftTimerCircle />
            <button className="mt-4 font-sora text-[13px] font-semibold text-white bg-gradient-to-b from-[#055cac] to-[#23a5e6] rounded-[25px] px-7 py-2.5">
              Check Out
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-[#055cac]" />
              <span className="font-sora text-[13px] font-semibold text-[#242424]">
                Location
              </span>
            </div>
            <span className="font-sora text-[13px] text-[#424242]">
              HQ Office — Bangalore
            </span>
            <StatusBadge label="In Geofence" variant="success" size="sm" />
          </div>
        </div>

        {/* Center: Calendar */}
        <div className="flex-1 bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <h3 className="font-sora text-base font-semibold text-[#242424]">
              Attendance Calendar
            </h3>
            <span className="font-sora text-[11px] text-[#616161]">March 2025</span>
          </div>
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 px-5">
            {dayNames.map((d) => (
              <div key={d} className="text-center font-sora text-[10px] font-semibold text-[#616161] py-1">
                {d}
              </div>
            ))}
          </div>
          {/* Calendar Grid — March starts on Saturday (offset 5) */}
          <div className="grid grid-cols-7 gap-1 px-5 pb-4 mt-1">
            {/* Empty cells for offset (March 2025 starts on Saturday = index 5) */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {calendarDays.map((day) => (
              <div
                key={day.date}
                className={`w-full aspect-square flex items-center justify-center rounded-lg text-[12px] font-sora font-medium ${calendarStatusColors[day.status]}`}
              >
                {day.date}
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 px-5 pb-3 mt-auto">
            {[
              { label: "Present", color: "bg-[#107c10]" },
              { label: "Absent", color: "bg-[#c50f1f]" },
              { label: "Late", color: "bg-[#f59e0b]" },
              { label: "Leave", color: "bg-[#055cac]" },
              { label: "Weekend", color: "bg-[#f5f5f5] border border-[#d1d1d1]" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-sm ${item.color}`} />
                <span className="font-sora text-[10px] text-[#616161]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Leave Balances */}
        <div className="w-[280px] bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <h3 className="font-sora text-base font-semibold text-[#242424]">Leave Balance</h3>
          </div>
          <div className="flex flex-col gap-3 px-5 pb-4">
            {leaveBalances.map((bal) => (
              <div key={bal.type} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-sora text-[12px] text-[#424242]">{bal.type}</span>
                  <span className="font-sora text-[12px] font-semibold text-[#242424]">
                    {bal.used}/{bal.total}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#055cac] to-[#23a5e6] rounded-full"
                    style={{ width: `${(bal.used / bal.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto px-5 pb-4">
            <button className="w-full font-sora text-[13px] font-semibold text-[#055cac] border border-[#055cac] rounded-[25px] py-2 hover:bg-[#ebf3fc] transition-colors">
              Apply Leave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
