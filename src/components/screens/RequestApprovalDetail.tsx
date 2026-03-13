"use client";

import { ChevronRight, Paperclip, Check, X } from "lucide-react";
import {
  Header,
  Breadcrumbs,
  Avatar,
  StatusBadge,
  getLeaveTypeLabel,
} from "@/components/shared";
import { leaveBalances } from "@/data/mockData";

const requestDetail = {
  employee: {
    name: "Sneha Patel",
    initials: "SP",
    department: "Engineering",
    employeeId: "EMP042",
    reportingManager: "Rahul Kumar",
  },
  leaveType: "casual" as const,
  fromDate: "Mar 15, 2025",
  toDate: "Mar 16, 2025",
  days: 2,
  reason:
    "Need to attend a family function out of town. Will be back on 17th and resume work.",
  attachments: ["family_event_invite.pdf"],
  status: "pending" as const,
  leaveBalances,
  history: [
    { action: "Request Submitted", by: "Sneha Patel", timestamp: "Mar 10, 2025 — 09:15 AM" },
    { action: "Auto-routed to Manager", by: "System", timestamp: "Mar 10, 2025 — 09:15 AM" },
  ],
};

export function RequestApprovalDetail() {
  return (
    <div className="flex flex-col w-[1440px] h-[900px] bg-[#f5f5f5]">
      <Header activeRole="manager" />

      {/* Breadcrumbs + Title */}
      <div className="px-8 pt-4 pb-2 flex flex-col gap-2">
        <Breadcrumbs
          items={[
            { label: "Team Overview", href: "/attendance/manager" },
            { label: "Pending Approvals", href: "/attendance/manager" },
            { label: "Request Detail" },
          ]}
        />
        <div className="flex items-center justify-between">
          <h1 className="font-sora text-[22px] font-bold text-[#242424]">
            Leave Request Detail
          </h1>
          <StatusBadge label="Pending" variant="warning" size="md" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 px-8 mt-2 flex-1 min-h-0">
        {/* Left: Request Details */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Employee Info Card */}
          <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] p-5">
            <div className="flex items-center gap-4">
              <Avatar initials={requestDetail.employee.initials} size={48} />
              <div>
                <span className="font-sora text-base font-semibold text-[#242424] block">
                  {requestDetail.employee.name}
                </span>
                <span className="font-sora text-[12px] text-[#616161]">
                  {requestDetail.employee.department} &middot; {requestDetail.employee.employeeId}
                </span>
              </div>
            </div>
          </div>

          {/* Leave Details Card */}
          <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] p-5 flex flex-col gap-4">
            <h3 className="font-sora text-base font-semibold text-[#242424]">
              Leave Details
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="font-sora text-[11px] text-[#616161] block mb-1">
                  Leave Type
                </span>
                <StatusBadge
                  label={getLeaveTypeLabel(requestDetail.leaveType)}
                  variant="informative"
                  size="md"
                />
              </div>
              <div>
                <span className="font-sora text-[11px] text-[#616161] block mb-1">
                  Duration
                </span>
                <span className="font-sora text-[13px] font-medium text-[#242424]">
                  {requestDetail.days} Day{requestDetail.days > 1 ? "s" : ""}
                </span>
              </div>
              <div>
                <span className="font-sora text-[11px] text-[#616161] block mb-1">
                  Date Range
                </span>
                <span className="font-sora text-[13px] font-medium text-[#242424]">
                  {requestDetail.fromDate} — {requestDetail.toDate}
                </span>
              </div>
            </div>

            <div>
              <span className="font-sora text-[11px] text-[#616161] block mb-1">
                Reason
              </span>
              <p className="font-sora text-[13px] text-[#424242] leading-relaxed">
                {requestDetail.reason}
              </p>
            </div>

            {/* Attachments */}
            {requestDetail.attachments.length > 0 && (
              <div>
                <span className="font-sora text-[11px] text-[#616161] block mb-2">
                  Attachments
                </span>
                {requestDetail.attachments.map((file) => (
                  <div
                    key={file}
                    className="flex items-center gap-2 bg-[#f9fafb] rounded-lg px-3 py-2 w-fit"
                  >
                    <Paperclip className="w-3.5 h-3.5 text-[#055cac]" />
                    <span className="font-sora text-[12px] text-[#055cac]">{file}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 font-sora text-[13px] font-semibold text-white bg-gradient-to-b from-[#055cac] to-[#23a5e6] rounded-[25px] px-7 py-2.5">
              <Check className="w-4 h-4" />
              Approve
            </button>
            <button className="flex items-center gap-2 font-sora text-[13px] font-medium text-[#c50f1f] border border-[#c50f1f] rounded-[25px] px-7 py-2.5 hover:bg-[#fef2f2] transition-colors">
              <X className="w-4 h-4" />
              Reject
            </button>
            <button className="font-sora text-[13px] font-medium text-[#616161] border border-[#d1d5db] rounded-[25px] px-7 py-2.5 hover:bg-[#f5f5f5] transition-colors">
              Request Info
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[380px] flex flex-col gap-4">
          {/* Leave Balance */}
          <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] p-5">
            <h3 className="font-sora text-base font-semibold text-[#242424] mb-4">
              {requestDetail.employee.name.split(" ")[0]}&apos;s Leave Balance
            </h3>
            <div className="flex flex-col gap-3">
              {requestDetail.leaveBalances.map((bal) => (
                <div key={bal.type} className="flex items-center justify-between">
                  <span className="font-sora text-[13px] text-[#424242]">{bal.type}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-[80px] h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#055cac] to-[#23a5e6] rounded-full"
                        style={{ width: `${(bal.used / bal.total) * 100}%` }}
                      />
                    </div>
                    <span className="font-sora text-[12px] font-semibold text-[#242424] w-[50px] text-right">
                      {bal.total - bal.used}/{bal.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Request Timeline */}
          <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] p-5">
            <h3 className="font-sora text-base font-semibold text-[#242424] mb-4">
              Request Timeline
            </h3>
            <div className="flex flex-col gap-4">
              {requestDetail.history.map((event, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#055cac] shrink-0" />
                    {i < requestDetail.history.length - 1 && (
                      <div className="w-px flex-1 bg-[#e5e7eb] mt-1" />
                    )}
                  </div>
                  <div className="pb-2">
                    <span className="font-sora text-[13px] font-medium text-[#242424] block">
                      {event.action}
                    </span>
                    <span className="font-sora text-[11px] text-[#616161]">
                      {event.by} &middot; {event.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              {/* Pending step */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-[#f59e0b] bg-white shrink-0" />
                </div>
                <div>
                  <span className="font-sora text-[13px] font-medium text-[#f59e0b] block">
                    Awaiting Approval
                  </span>
                  <span className="font-sora text-[11px] text-[#616161]">
                    Rahul Kumar (Manager)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Manager Notes */}
          <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] p-5">
            <h3 className="font-sora text-base font-semibold text-[#242424] mb-3">
              Add Note
            </h3>
            <textarea
              placeholder="Add a note for the employee (optional)..."
              rows={3}
              className="w-full bg-[#f9fafb] border border-[#d1d5db] rounded-xl px-4 py-2.5 font-sora text-[13px] text-[#242424] placeholder:text-[#9ca3af] outline-none resize-none focus:border-[#055cac]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
