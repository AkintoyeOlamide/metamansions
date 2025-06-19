"use client";

import { useState } from "react";

export default function AffiliatesPage() {
  const [activeTab, setActiveTab] = useState("Customer");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar is handled globally */}
      <main className="flex-1 flex flex-col items-center px-0 py-8">
        <div className="w-full rounded-xl border-l border-t border-b border-[#232323] shadow p-0">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-[#232323]">
            <h1 className="text-white text-2xl font-semibold">Affiliates</h1>
            {activeTab === "Creator" ? (
              <button className="px-4 py-2 bg-[#FFD700] text-black rounded font-medium text-sm hover:bg-yellow-400 transition">Copy Affiliate Link</button>
            ) : (
              <button className="px-4 py-2 bg-[#FFD700] text-black rounded font-medium text-sm flex items-center gap-2 hover:bg-yellow-400 transition">
                <span className="inline-block"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect width="18" height="18" rx="2" fill="white" fillOpacity="0.1"/><path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></span>
                Start Meta Mansions Affiliates training
              </button>
            )}
          </div>
          {/* Tabs */}
          <div className="flex gap-2 px-8 pt-4">
            <button
              className={`px-4 py-1.5 rounded font-medium text-sm border ${activeTab === "Customer" ? "bg-white text-black border-zinc-700" : "bg-transparent text-zinc-400 border-transparent"}`}
              onClick={() => setActiveTab("Customer")}
            >
              Customer
            </button>
            <button
              className={`px-4 py-1.5 rounded font-medium text-sm border ${activeTab === "Creator" ? "bg-white text-black border-zinc-700" : "bg-transparent text-zinc-400 border-transparent"}`}
              onClick={() => setActiveTab("Creator")}
            >
              Creator
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "Customer" ? (
            <>
              {/* My affiliate links */}
              <div className="px-8 pt-6 pb-2">
                <div className="text-white text-base font-medium mb-4">My affiliate links</div>
                <div className="flex flex-col items-center justify-center w-full h-72 bg-[#232323] rounded-2xl">
                  <img src="/affiliate-placeholder.png" alt="No affiliate links" className="w-40 h-40 object-contain mb-4" />
                  <div className="text-2xl font-semibold text-white mb-2 text-center">No affiliate links <span className="text-yellow-400">yet</span></div>
                  <div className="text-zinc-400 text-base mb-4 text-center">Meta Mansions you become an affiliate for will show up here.</div>
                  <button className="px-5 py-2 bg-[#FFD700] text-black rounded font-semibold text-base hover:bg-yellow-400 transition">Discover Meta Mansions</button>
                </div>
              </div>
              {/* Stats section placeholder */}
              <div className="px-8 pt-8 pb-4">
                <div className="text-white text-base font-medium mb-2">Stats</div>
                {/* Add stats UI here if needed */}
              </div>
              {/* Finances Section */}
              <div className="px-8 pt-2 pb-8">
                <div className="text-white text-base font-medium mb-4">Finances</div>
                {/* Info Bar */}
                <div className="flex items-center bg-[#FFD700]/10 border border-[#FFD700] rounded-lg px-6 py-4 mb-6">
                  <span className="text-zinc-200 text-sm flex-1">Set up your payment accounts to get paid fast.</span>
                  <button className="ml-4 px-4 py-2 bg-[#FFD700] text-black rounded font-medium text-sm hover:bg-yellow-400 transition">Set up Meta Mansions Payments</button>
                </div>
                {/* Finance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#181818] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
                    <span className="text-zinc-400 text-sm mb-1">Reserve balance</span>
                    <span className="text-2xl font-bold text-white">$0.00</span>
                    <span className="text-zinc-500 text-xs mt-1">Affiliates</span>
                  </div>
                  <div className="bg-[#181818] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
                    <span className="text-zinc-400 text-sm mb-1">Pending balance</span>
                    <span className="text-2xl font-bold text-white">$0.00</span>
                    <span className="text-zinc-500 text-xs mt-1">Today</span>
                  </div>
                  <div className="bg-[#181818] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
                    <span className="text-zinc-400 text-sm mb-1">Available to pay out</span>
                    <span className="text-2xl font-bold text-white">$0.00</span>
                    <span className="text-zinc-500 text-xs mt-1">Today</span>
                  </div>
                  <div className="bg-[#181818] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
                    <span className="text-zinc-400 text-sm mb-1">In transit to bank</span>
                    <span className="text-2xl font-bold text-white">$0.00</span>
                    <span className="text-zinc-500 text-xs mt-1">Today</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Info Bar */}
              <div className="px-8 pt-6">
                <div className="flex items-center bg-[#FFD700]/10 border border-[#FFD700] rounded-lg px-6 py-4 mb-4">
                  <span className="text-zinc-200 text-sm flex-1">
                    <span className="inline-block align-middle mr-2"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#FFD700" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="14" fill="#FFD700">i</text></svg></span>
                    As a Meta Mansions affiliate you get <span className="text-yellow-400 font-bold">30%</span> of the revenue we generate from each creator you onboard for all sales they drive, for life!
                  </span>
                </div>
                {/* Payment Setup Bar */}
                <div className="flex items-center bg-[#FFD700]/10 border border-[#FFD700] rounded-lg px-6 py-4 mb-6">
                  <span className="text-zinc-200 text-sm flex-1">Set up your payment accounts to get paid fast.</span>
                  <button className="ml-4 px-4 py-2 bg-[#FFD700] text-black rounded font-medium text-sm hover:bg-yellow-400 transition">Set up Meta Mansions Payments</button>
                </div>
                {/* Finance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-[#181818] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
                    <span className="text-zinc-400 text-sm mb-1">Reserve balance</span>
                    <span className="text-2xl font-bold text-white">$0.00</span>
                    <span className="text-zinc-500 text-xs mt-1">Today</span>
                  </div>
                  <div className="bg-[#181818] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
                    <span className="text-zinc-400 text-sm mb-1">Pending balance</span>
                    <span className="text-2xl font-bold text-white">$0.00</span>
                    <span className="text-zinc-500 text-xs mt-1">Today</span>
                  </div>
                  <div className="bg-[#181818] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
                    <span className="text-zinc-400 text-sm mb-1">Available to pay out</span>
                    <span className="text-2xl font-bold text-white">$0.00</span>
                    <span className="text-zinc-500 text-xs mt-1">Today</span>
                  </div>
                  <div className="bg-[#181818] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
                    <span className="text-zinc-400 text-sm mb-1">In transit to bank</span>
                    <span className="text-2xl font-bold text-white">$0.00</span>
                    <span className="text-zinc-500 text-xs mt-1">Today</span>
                  </div>
                </div>
                {/* Creators referred table */}
                <div className="mt-8">
                  <div className="text-white text-base font-medium mb-2">Creators referred <span role="img" aria-label="cat">🐱</span></div>
                  <div className="bg-[#181818] border border-zinc-800 rounded-2xl overflow-x-auto">
                    <table className="min-w-full text-left">
                      <thead>
                        <tr className="border-b border-zinc-800">
                          <th className="px-6 py-4 text-zinc-400 font-semibold text-sm">Creator</th>
                          <th className="px-6 py-4 text-zinc-400 font-semibold text-sm">You've made (total)</th>
                          <th className="px-6 py-4 text-zinc-400 font-semibold text-sm">Days of payouts remaining</th>
                          <th className="px-6 py-4 text-zinc-400 font-semibold text-sm">Date referred</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-zinc-400 text-base">You can make 30% of our revenue for life for any creator you refer</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button className="px-6 py-2 bg-[#FFD700] text-black rounded font-semibold text-base hover:bg-yellow-400 transition">Copy Affiliate Link</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
} 