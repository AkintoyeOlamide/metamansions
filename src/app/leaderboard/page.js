"use client";
import React from "react";
import OnboardingBottomBar from '../auth/onboarding/OnboardingBottomBar';
import AuthSidebar from '../auth/AuthSidebar';

export default function LeaderboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#18181b] text-white">
      <AuthSidebar />
      <div className="flex-1 flex flex-col items-center py-8 px-2">
        {/* Header */}
        <div className="w-full max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Leaderboard</h1>
          <div className="border-b border-zinc-800 mb-6" />
          {/* Total Earnings */}
          <div className="flex flex-col items-center mb-6">
            <div className="text-3xl md:text-4xl font-extrabold text-blue-200 mb-2">$1,210,726,301</div>
            <div className="text-sm text-zinc-400 mb-2">Lifetime earnings by everyone</div>
            <div className="w-full max-w-lg flex flex-col items-center">
              <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden mb-1">
                <div className="h-full bg-blue-600" style={{ width: '12.1%' }} />
              </div>
              <div className="flex justify-between w-full text-xs text-zinc-400">
                <span>12.10% until $10B</span>
                <span>Only <span className="text-blue-400">$8,789,273,699</span> to go!</span>
              </div>
            </div>
          </div>
          {/* Main Cards Row */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 w-full">
            {/* Welcome Card */}
            <div className="flex-1 bg-zinc-900 rounded-xl border border-zinc-800 p-6 flex flex-col items-center justify-center min-w-[260px]">
              <span className="mb-3">
                <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="16" height="16" rx="4" fill="#FFD700"/>
                  <rect x="6" y="6" width="8" height="8" rx="2" fill="#fff"/>
                </svg>
              </span>
              <div className="text-lg font-semibold mb-1 text-white text-center">Welcome to the global leaderboard</div>
              <div className="text-sm text-zinc-400 text-center">This leaderboard shows users' positions based on the money they've earned on Meta Mansions in the last 24 hours.</div>
            </div>
            {/* My Stats Card */}
            <div className="flex-1 bg-zinc-900 rounded-xl border border-zinc-800 p-6 min-w-[260px] flex flex-col gap-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-semibold text-white">My stats</span>
                <span className="text-xs text-zinc-400">Show earnings on profile <span className="ml-1 inline-block align-middle"><input type="checkbox" checked readOnly className="accent-blue-500" /></span></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  <span className="inline-block bg-zinc-800 p-1 rounded">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="4" fill="#00C853"/><rect x="6" y="6" width="8" height="8" rx="2" fill="#fff"/></svg>
                  </span>
                  Last 24 hours
                </span>
                <span className="text-white font-mono">$0.00</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-1">
                <div className="h-full bg-green-600" style={{ width: '0%' }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Lifetime earnings</span>
                <span className="text-white font-mono">$0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Leaderboard rank</span>
                <span className="text-yellow-400 font-semibold">Not ranked</span>
              </div>
            </div>
          </div>
          {/* Earned in the last 24 hours */}
          <div className="w-full max-w-3xl mx-auto">
            <div className="text-lg font-semibold mb-2">Earned in the last 24 hours</div>
            <div className="bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="flex items-center px-4 py-2 border-b border-zinc-800">
                <span className="text-xs text-zinc-400 mr-4">All users</span>
              </div>
              <div className="divide-y divide-zinc-800">
                {/* Example user rows */}
                <div className="flex items-center px-4 py-3 gap-4">
                  <span className="text-yellow-400 font-bold text-lg w-6 text-center">1</span>
                  <span className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-lg font-bold text-white">A</span>
                  <div className="flex flex-col flex-1">
                    <span className="font-semibold text-white">Ari Brozost</span>
                    <span className="text-xs text-zinc-400">@aribrozost</span>
                  </div>
                  <span className="text-green-400 font-semibold text-base">$73,274.62</span>
                </div>
                <div className="flex items-center px-4 py-3 gap-4">
                  <span className="text-yellow-300 font-bold text-lg w-6 text-center">2</span>
                  <span className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-lg font-bold text-white">R</span>
                  <div className="flex flex-col flex-1">
                    <span className="font-semibold text-white">Rudy</span>
                    <span className="text-xs text-zinc-400">@rudy</span>
                  </div>
                  <span className="text-green-400 font-semibold text-base">$29,018.78</span>
                </div>
                {/* Add more users as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <OnboardingBottomBar />
    </div>
  );
} 