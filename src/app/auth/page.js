"use client";

import Image from 'next/image';
import { useState } from 'react';

export default function AuthDashboard() {
  const [tab, setTab] = useState('Home');
  return (
    <div className="flex h-screen w-full bg-black">
      {/* Sidebar is handled globally */}
      {/* Feed and Welcome Section */}
      <div className="flex flex-1">
        {/* Feed Section */}
        <div className="flex flex-col w-[420px] min-w-[320px] max-w-[480px] h-full border-r border-zinc-800 bg-[#18191c]">
          {/* Happening Now */}
          <div className="p-4 border-b border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white text-base">Happening now</span>
              <button className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">Go live</button>
            </div>
            <div className="flex gap-2">
              <div className="w-14 h-14 bg-zinc-900 rounded-lg flex items-center justify-center text-xs text-white border border-zinc-700">WhopU Chat</div>
              <div className="w-14 h-14 bg-zinc-900 rounded-lg flex items-center justify-center text-xs text-white border border-zinc-700">Whop University</div>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex border-b border-zinc-800 bg-[#18191c]">
            {['Home', 'Chat', 'Earn', 'Learn'].map((t) => (
              <button
                key={t}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${tab === t ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-zinc-400'}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          {/* Feed Posts */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Example Post 1 */}
            <div className="bg-zinc-900 rounded-lg p-4 flex flex-col gap-2 shadow border border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-zinc-700" />
                <span className="text-white font-semibold text-sm">Genius Bar</span>
                <span className="text-zinc-500 text-xs">@thegeniusbar · 2h</span>
              </div>
              <div className="text-white text-sm">Start selling on Meta Mansions. Ask Meta Mansions Questions. Improve your Meta Mansions, etc.</div>
            </div>
            {/* Example Post 2 */}
            <div className="bg-zinc-900 rounded-lg p-4 flex flex-col gap-2 shadow border border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-zinc-700" />
                <span className="text-white font-semibold text-sm">Genius Bar</span>
                <span className="text-zinc-500 text-xs">@thegeniusbar · 1d</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="aspect-square bg-zinc-800 rounded-lg" />
                <div className="aspect-square bg-zinc-800 rounded-lg" />
                <div className="aspect-square bg-zinc-800 rounded-lg" />
                <div className="aspect-square bg-zinc-800 rounded-lg" />
              </div>
              <div className="text-white text-sm mt-2">Meta Mansions Wednesday | Improve Funnel, Use all of Meta Mansions' Features, Launch, Make Money</div>
            </div>
            {/* Example Post 3 */}
            <div className="bg-zinc-900 rounded-lg p-4 flex flex-col gap-2 shadow border border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-zinc-700" />
                <span className="text-white font-semibold text-sm">Genius Bar</span>
                <span className="text-zinc-500 text-xs">@thegeniusbar · 2d</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="aspect-square bg-zinc-800 rounded-lg" />
                <div className="aspect-square bg-zinc-800 rounded-lg" />
              </div>
              <div className="text-white text-sm mt-2">Video call with the team</div>
            </div>
          </div>
        </div>
        {/* Welcome Card Section */}
        <div className="flex-1 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center justify-center border border-zinc-800 rounded-xl bg-zinc-900 p-10 shadow-lg min-w-[340px] max-w-[400px] mx-auto">
            <div className="mb-4">
              <img src="/whop-bowl.png" alt="Welcome to Whop" className="w-32 h-32 object-contain mx-auto" />
            </div>
            <div className="text-white text-xl font-bold mb-2 text-center">Welcome to Meta Mansions <span role="img" aria-label="house">🏠</span></div>
            <div className="text-zinc-400 text-sm text-center mb-2">Select a post or app to open it here</div>
          </div>
        </div>
      </div>
      {/* Bottom bar and other overlays handled globally */}
    </div>
  );
} 