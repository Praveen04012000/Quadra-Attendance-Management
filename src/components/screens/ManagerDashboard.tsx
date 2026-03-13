"use client";

import {
  Search,
  ChevronDown,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import {
  Header,
  StatCard,
  StatusBadge,
  Avatar,
  getAttendanceVariant,
  getAttendanceLabel,
  getLeaveTypeLabel,
} from "@/components/shared";
import {
  managerStats,
  teamMembers,
  pendingApprovals,
  escalationAlerts,
} from "@/data/mockData";

const locationLabels: Record<string, string> = {
  in_office: "In Office",
  remote: "Remote",
  outside_geofence: "Outside",
};

export function ManagerDashboard() {
  return (
    <div className="flex flex-col w-[1440px] h-[900px] bg-[#f5f5f5]">
      <Header activeRole="manager" />

      {/* Header Row */}
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="font-sora text-[22px] font-bold text-[#242424]">
          Team Overview
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-[#d1d1d1] rounded-xl px-3.5 py-2 cursor-pointer">
            <span className="font-sora text-[13px] text-[#242424]">Today</span>
            <ChevronDown className="w-4 h-4 text-[#616161]" />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="flex gap-4 px-8">
        {managerStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Middle Section */}
      <div className="flex gap-4 px-8 mt-4 flex-1 min-h-0">
        {/* Team Members Table */}
        <div className="flex-1 bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <h3 className="font-sora text-base font-semibold text-[#242424]">
              Team Members
            </h3>
            <div className="flex items-center gap-2 border border-[#d1d5db] rounded-lg px-3 h-9 w-56">
              <Search className="w-4 h-4 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search members..."
                className="font-sora text-[13px] text-[#242424] placeholder:text-[#9ca3af] outline-none flex-1 bg-transparent"
              />
            </div>
          </div>

          {/* Table Header */}
          <div className="flex items-center px-5 py-2.5 bg-[#f9fafb] border-b border-[#e5e7eb]">
            <span className="w-[200px] font-sora text-[11px] font-semibold text-[#616161]">Employee</span>
            <span className="w-[90px] font-sora text-[11px] font-semibold text-[#616161]">Status</span>
            <span className="w-[100px] font-sora text-[11px] font-semibold text-[#616161]">Check-in</span>
            <span className="w-[100px] font-sora text-[11px] font-semibold text-[#616161]">Location</span>
            <span className="flex-1 font-sora text-[11px] font-semibold text-[#616161]">Hours Worked</span>
          </div>

          {/* Table Rows */}
          {teamMembers.map((member, i) => (
            <div
              key={member.id}
              className={`flex items-center px-5 py-2.5 ${
                i < teamMembers.length - 1 ? "border-b border-[#e5e7eb]" : ""
              }`}
            >
              <div className="w-[200px] flex items-center gap-2.5">
                <Avatar initials={member.initials} size={30} />
                <span className="font-sora text-[13px] font-medium text-[#242424]">
                  {member.name}
                </span>
              </div>
              <div className="w-[90px]">
                <StatusBadge
                  label={getAttendanceLabel(member.status)}
                  variant={getAttendanceVariant(member.status)}
                />
              </div>
              <span className="w-[100px] font-sora text-[13px] text-[#424242]">
                {member.checkInTime}
              </span>
              <span className="w-[100px] font-sora text-[13px] text-[#424242]">
                {locationLabels[member.location]}
              </span>
              <span className="flex-1 font-sora text-[13px] text-[#424242]">
                {member.hoursWorked}
              </span>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="w-[380px] flex flex-col gap-4">
          {/* Pending Approvals */}
          <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-2">
                <h3 className="font-sora text-base font-semibold text-[#242424]">
                  Pending Approvals
                </h3>
                <StatusBadge label={`${pendingApprovals.length}`} variant="brand" size="sm" />
              </div>
              <button className="font-sora text-[11px] text-[#055cac] font-medium flex items-center gap-0.5">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {pendingApprovals.map((approval, i) => (
              <div
                key={approval.id}
                className={`flex items-center gap-3 px-5 py-3 ${
                  i < pendingApprovals.length - 1 ? "border-b border-[#e5e7eb]" : ""
                }`}
              >
                <Avatar initials={approval.initials} size={32} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-sora text-[13px] font-medium text-[#242424]">
                      {approval.employeeName}
                    </span>
                    <StatusBadge
                      label={getLeaveTypeLabel(approval.leaveType)}
                      variant="informative"
                    />
                  </div>
                  <span className="font-sora text-[11px] text-[#616161]">
                    {approval.fromDate} — {approval.toDate} ({approval.days} day{approval.days > 1 ? "s" : ""})
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Escalation Alerts */}
          <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4">
              <AlertTriangle className="w-4 h-4 text-[#c50f1f]" />
              <h3 className="font-sora text-base font-semibold text-[#242424]">
                Escalation Alerts
              </h3>
            </div>
            {escalationAlerts.map((alert, i) => (
              <div
                key={alert.id}
                className={`flex items-start gap-3 px-5 py-3 ${
                  i < escalationAlerts.length - 1 ? "border-b border-[#e5e7eb]" : ""
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-[#c50f1f] mt-1.5 shrink-0" />
                <div className="flex-1">
                  <span className="font-sora text-[13px] font-medium text-[#242424] block">
                    {alert.employeeName}
                  </span>
                  <span className="font-sora text-[11px] text-[#616161]">
                    {alert.description}
                  </span>
                </div>
                <span className="font-sora text-[10px] text-[#9ca3af] shrink-0">
                  {alert.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
