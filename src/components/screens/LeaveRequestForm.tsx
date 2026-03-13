"use client";

import { useState } from "react";
import { ChevronDown, Upload, Calendar } from "lucide-react";
import { Header, Breadcrumbs } from "@/components/shared";
import { currentUser, leaveBalances } from "@/data/mockData";
import type { RequestType, LeaveType } from "@/types/attendance";

const requestTypes: { key: RequestType; label: string }[] = [
  { key: "full_day", label: "Full Day" },
  { key: "half_day", label: "Half Day" },
  { key: "permission", label: "Permission" },
];

const leaveTypes: { key: LeaveType; label: string }[] = [
  { key: "casual", label: "Casual Leave" },
  { key: "sick", label: "Sick Leave" },
  { key: "earned", label: "Earned Leave" },
  { key: "comp_off", label: "Comp-off" },
];

export function LeaveRequestForm() {
  const [requestType, setRequestType] = useState<RequestType>("full_day");
  const [leaveType, setLeaveType] = useState<LeaveType>("casual");

  return (
    <div className="flex flex-col w-[1440px] h-[900px] bg-[#f5f5f5]">
      <Header activeRole="employee" />

      {/* Breadcrumbs + Title */}
      <div className="px-8 pt-4 pb-2 flex flex-col gap-2">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/attendance" },
            { label: "Apply Leave" },
          ]}
        />
        <h1 className="font-sora text-[22px] font-bold text-[#242424]">
          Apply Leave
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 px-8 mt-2 flex-1 min-h-0">
        {/* Left: Form */}
        <div className="flex-1 bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] p-6 flex flex-col">
          <h3 className="font-sora text-base font-semibold text-[#242424] mb-5">
            Leave Details
          </h3>

          {/* Request Type */}
          <div className="mb-5">
            <label className="font-sora text-[12px] font-medium text-[#616161] mb-2 block">
              Request Type
            </label>
            <div className="flex gap-2">
              {requestTypes.map((rt) => (
                <button
                  key={rt.key}
                  onClick={() => setRequestType(rt.key)}
                  className={`px-5 py-2 rounded-[25px] font-sora text-[13px] transition-all ${
                    requestType === rt.key
                      ? "bg-gradient-to-b from-[#055cac] to-[#23a5e6] text-white font-semibold"
                      : "bg-[#f5f5f5] text-[#424242] hover:bg-[#e5e7eb]"
                  }`}
                >
                  {rt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Leave Type */}
          <div className="mb-5">
            <label className="font-sora text-[12px] font-medium text-[#616161] mb-2 block">
              Leave Type
            </label>
            <div className="relative">
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value as LeaveType)}
                className="w-full appearance-none bg-white border border-[#d1d5db] rounded-xl px-4 py-2.5 font-sora text-[13px] text-[#242424] outline-none focus:border-[#055cac]"
              >
                {leaveTypes.map((lt) => (
                  <option key={lt.key} value={lt.key}>
                    {lt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#616161] pointer-events-none" />
            </div>
          </div>

          {/* Date Range */}
          <div className="flex gap-4 mb-5">
            <div className="flex-1">
              <label className="font-sora text-[12px] font-medium text-[#616161] mb-2 block">
                From Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select date"
                  className="w-full bg-white border border-[#d1d5db] rounded-xl px-4 py-2.5 font-sora text-[13px] text-[#242424] outline-none focus:border-[#055cac]"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#616161] pointer-events-none" />
              </div>
            </div>
            <div className="flex-1">
              <label className="font-sora text-[12px] font-medium text-[#616161] mb-2 block">
                To Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select date"
                  className="w-full bg-white border border-[#d1d5db] rounded-xl px-4 py-2.5 font-sora text-[13px] text-[#242424] outline-none focus:border-[#055cac]"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#616161] pointer-events-none" />
              </div>
            </div>
            <div className="w-[120px]">
              <label className="font-sora text-[12px] font-medium text-[#616161] mb-2 block">
                No. of Days
              </label>
              <div className="bg-[#f5f5f5] border border-[#d1d5db] rounded-xl px-4 py-2.5 font-sora text-[13px] font-semibold text-[#242424]">
                2
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="mb-5">
            <label className="font-sora text-[12px] font-medium text-[#616161] mb-2 block">
              Reason
            </label>
            <textarea
              placeholder="Enter the reason for your leave request..."
              rows={3}
              className="w-full bg-white border border-[#d1d5db] rounded-xl px-4 py-2.5 font-sora text-[13px] text-[#242424] placeholder:text-[#9ca3af] outline-none resize-none focus:border-[#055cac]"
            />
          </div>

          {/* Attachment */}
          <div className="mb-5">
            <label className="font-sora text-[12px] font-medium text-[#616161] mb-2 block">
              Attachment (Optional)
            </label>
            <div className="border-2 border-dashed border-[#d1d5db] rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-[#055cac] transition-colors">
              <Upload className="w-6 h-6 text-[#9ca3af]" />
              <span className="font-sora text-[12px] text-[#616161]">
                Click to upload or drag &amp; drop
              </span>
              <span className="font-sora text-[10px] text-[#9ca3af]">
                PDF, JPG, PNG (max 5MB)
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-auto">
            <button className="font-sora text-[13px] font-semibold text-white bg-gradient-to-b from-[#055cac] to-[#23a5e6] rounded-[25px] px-7 py-2.5">
              Submit Request
            </button>
            <button className="font-sora text-[13px] font-medium text-[#616161] border border-[#d1d5db] rounded-[25px] px-7 py-2.5 hover:bg-[#f5f5f5] transition-colors">
              Cancel
            </button>
          </div>
        </div>

        {/* Right: Leave Balance Summary + Approver Info */}
        <div className="w-[360px] flex flex-col gap-4">
          {/* Leave Balance */}
          <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] p-5">
            <h3 className="font-sora text-base font-semibold text-[#242424] mb-4">
              Leave Balance
            </h3>
            <div className="flex flex-col gap-3">
              {leaveBalances.map((bal) => (
                <div key={bal.type} className="flex items-center justify-between">
                  <span className="font-sora text-[13px] text-[#424242]">{bal.type}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-[100px] h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#055cac] to-[#23a5e6] rounded-full"
                        style={{ width: `${(bal.used / bal.total) * 100}%` }}
                      />
                    </div>
                    <span className="font-sora text-[12px] font-semibold text-[#242424] w-[50px] text-right">
                      {bal.total - bal.used} left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approver Info */}
          <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] p-5">
            <h3 className="font-sora text-base font-semibold text-[#242424] mb-3">
              Approval Chain
            </h3>
            <div className="flex items-center gap-3 p-3 bg-[#f9fafb] rounded-lg">
              <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[#055cac] to-[#23a5e6] flex items-center justify-center shrink-0">
                <span className="font-sora text-[11px] font-semibold text-white">PS</span>
              </div>
              <div>
                <span className="font-sora text-[13px] font-medium text-[#242424] block">
                  {currentUser.reportingManager}
                </span>
                <span className="font-sora text-[11px] text-[#616161]">Reporting Manager</span>
              </div>
            </div>
          </div>

          {/* Policy Note */}
          <div className="bg-[#ebf3fc] rounded-xl p-4">
            <p className="font-sora text-[12px] text-[#055cac] leading-relaxed">
              Leave requests should be submitted at least 3 days in advance for
              planned leaves. Emergency leaves require supporting documentation
              within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
