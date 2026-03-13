"use client";

import {
  ChevronDown,
  ChevronRight,
  Search,
  Clock,
  MapPin,
  FileText,
  Bell,
  Calendar,
} from "lucide-react";
import {
  Header,
  StatCard,
  StatusBadge,
  getComplianceVariant,
  getComplianceLabel,
} from "@/components/shared";
import {
  hrStats,
  departmentCompliance,
  regularizationQueue,
  configLinks,
} from "@/data/mockData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  clock: Clock,
  "map-pin": MapPin,
  "file-text": FileText,
  bell: Bell,
  calendar: Calendar,
};

export function HRAdminDashboard() {
  return (
    <div className="flex flex-col w-[1440px] h-[900px] bg-[#f5f5f5]">
      <Header activeRole="hr_admin" />

      {/* Header Row */}
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="font-sora text-[22px] font-bold text-[#242424]">
          Organization Attendance
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-[#d1d1d1] rounded-xl px-3.5 py-2 cursor-pointer">
            <span className="font-sora text-[13px] text-[#242424]">
              This Month
            </span>
            <ChevronDown className="w-4 h-4 text-[#616161]" />
          </div>
          <button className="font-sora text-[13px] text-[#171717] px-7 py-2.5 rounded-[25px] border-2 border-transparent bg-white"
            style={{ borderImage: "linear-gradient(to right, #055cac, #23a5e6) 1", borderImageSlice: 1 }}>
            Download Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="flex gap-4 px-8">
        {hrStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Middle Section */}
      <div className="flex gap-4 px-8 mt-4 flex-1 min-h-0">
        {/* Department Compliance Table */}
        <div className="flex-1 bg-white rounded-xl shadow-card flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <h3 className="font-sora text-base font-semibold text-[#242424]">
              Department Compliance
            </h3>
            <div className="flex items-center gap-2 border border-[#d1d5db] rounded-lg px-3 h-9 w-60">
              <Search className="w-4 h-4 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search departments..."
                className="font-sora text-[13px] text-[#242424] placeholder:text-[#9ca3af] outline-none flex-1 bg-transparent"
              />
            </div>
          </div>

          {/* Table Header */}
          <div className="flex items-center px-5 py-2.5 bg-[#f9fafb] border-b border-[#e5e7eb]">
            <span className="flex-1 font-sora text-[11px] font-semibold text-[#616161]">Department</span>
            <span className="w-[110px] font-sora text-[11px] font-semibold text-[#616161]">Total Employees</span>
            <span className="w-[120px] font-sora text-[11px] font-semibold text-[#616161]">Avg Attendance %</span>
            <span className="w-[80px] font-sora text-[11px] font-semibold text-[#616161]">Late %</span>
            <span className="w-[80px] font-sora text-[11px] font-semibold text-[#616161]">Absent %</span>
            <span className="w-[120px] font-sora text-[11px] font-semibold text-[#616161]">Compliance</span>
          </div>

          {/* Table Rows */}
          {departmentCompliance.map((dept, i) => (
            <div
              key={dept.department}
              className={`flex items-center px-5 py-2.5 ${
                i < departmentCompliance.length - 1 ? "border-b border-[#e5e7eb]" : ""
              }`}
            >
              <span className="flex-1 font-sora text-[13px] font-medium text-[#242424]">{dept.department}</span>
              <span className="w-[110px] font-sora text-[13px] text-[#424242]">{dept.totalEmployees}</span>
              <span className="w-[120px] font-sora text-[13px] text-[#424242]">{dept.avgAttendance}%</span>
              <span className="w-[80px] font-sora text-[13px] text-[#424242]">{dept.latePercent}%</span>
              <span className="w-[80px] font-sora text-[13px] text-[#424242]">{dept.absentPercent}%</span>
              <div className="w-[120px]">
                <StatusBadge
                  label={getComplianceLabel(dept.status)}
                  variant={getComplianceVariant(dept.status)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Attendance Trends Chart */}
        <div className="w-[460px] bg-white rounded-xl shadow-card flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <h3 className="font-sora text-base font-semibold text-[#242424]">Attendance Trends</h3>
              <span className="font-sora text-[11px] text-[#616161]">Last 30 Days</span>
            </div>
          </div>
          <div className="flex-1 px-5 pb-4">
            <svg viewBox="0 0 400 200" className="w-full h-[200px]">
              {/* Y-axis labels */}
              <text x="0" y="15" className="fill-[#9ca3af] text-[10px]" fontFamily="Sora">100%</text>
              <text x="0" y="65" className="fill-[#9ca3af] text-[10px]" fontFamily="Sora">75%</text>
              <text x="0" y="115" className="fill-[#9ca3af] text-[10px]" fontFamily="Sora">50%</text>
              <text x="0" y="165" className="fill-[#9ca3af] text-[10px]" fontFamily="Sora">25%</text>
              {/* Grid lines */}
              {[20, 60, 110, 160].map((y) => (
                <line key={y} x1="35" y1={y} x2="395" y2={y} stroke="#f0f0f0" strokeWidth="1" />
              ))}
              {/* Present line (green) */}
              <polyline
                points="35,25 75,22 115,28 155,20 195,24 235,26 275,22 315,18 355,20 395,22"
                fill="none" stroke="#107c10" strokeWidth="2" strokeLinecap="round"
              />
              {/* Late line (yellow) */}
              <polyline
                points="35,145 75,140 115,148 155,138 195,142 235,150 275,136 315,144 355,140 395,146"
                fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"
              />
              {/* Absent line (red) */}
              <polyline
                points="35,160 75,158 115,164 155,155 195,162 235,168 275,154 315,160 355,158 395,165"
                fill="none" stroke="#c50f1f" strokeWidth="2" strokeLinecap="round"
              />
            </svg>
            {/* Legend */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#107c10]" />
                <span className="font-sora text-[10px] text-[#424242]">Present</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                <span className="font-sora text-[10px] text-[#424242]">Late</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#c50f1f]" />
                <span className="font-sora text-[10px] text-[#424242]">Absent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex gap-4 px-8 mt-4 pb-4">
        {/* Regularization Queue */}
        <div className="flex-1 bg-white rounded-xl shadow-card flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2">
              <h3 className="font-sora text-base font-semibold text-[#242424]">Regularization Queue</h3>
              <StatusBadge label="3 Pending" variant="brand" size="sm" />
            </div>
          </div>

          {/* Table Header */}
          <div className="flex items-center px-5 py-2.5 bg-[#f9fafb] border-b border-[#e5e7eb]">
            <span className="w-[130px] font-sora text-[11px] font-semibold text-[#616161]">Employee</span>
            <span className="w-[80px] font-sora text-[11px] font-semibold text-[#616161]">Date</span>
            <span className="w-[90px] font-sora text-[11px] font-semibold text-[#616161]">Original</span>
            <span className="w-[110px] font-sora text-[11px] font-semibold text-[#616161]">Requested</span>
            <span className="flex-1 font-sora text-[11px] font-semibold text-[#616161]">Reason</span>
            <span className="w-[140px] font-sora text-[11px] font-semibold text-[#616161]">Action</span>
          </div>

          {regularizationQueue.map((req, i) => (
            <div
              key={req.id}
              className={`flex items-center px-5 py-2.5 ${
                i < regularizationQueue.length - 1 ? "border-b border-[#e5e7eb]" : ""
              }`}
            >
              <span className="w-[130px] font-sora text-[13px] font-medium text-[#242424]">{req.employeeName}</span>
              <span className="w-[80px] font-sora text-[13px] text-[#424242]">{req.date}</span>
              <span className="w-[90px] font-sora text-[13px] text-[#424242]">{req.originalStatus}</span>
              <span className="w-[110px] font-sora text-[13px] text-[#424242]">{req.requestedStatus}</span>
              <span className="flex-1 font-sora text-[11px] text-[#616161] truncate pr-2">{req.reason}</span>
              <div className="w-[140px] flex items-center gap-2">
                <button className="font-sora text-[10px] font-semibold text-white bg-gradient-to-b from-[#055cac] to-[#23a5e6] rounded-full px-3 py-1">
                  Approve
                </button>
                <button className="font-sora text-[10px] font-medium text-[#c50f1f] border border-[#c50f1f] rounded-full px-3 py-1">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Configuration Quick Links */}
        <div className="w-[380px] bg-white rounded-xl shadow-card flex flex-col overflow-hidden">
          <div className="px-5 py-4">
            <h3 className="font-sora text-base font-semibold text-[#242424]">Configuration</h3>
          </div>
          {configLinks.map((link, i) => {
            const Icon = iconMap[link.icon] || FileText;
            return (
              <div
                key={link.label}
                className={`flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-[#f9fafb] transition-colors ${
                  i < configLinks.length - 1 ? "border-b border-[#e5e7eb]" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#616161]" />
                  <span className="font-sora text-[13px] text-[#242424]">{link.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#9ca3af]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
