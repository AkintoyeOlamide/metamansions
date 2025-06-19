"use client";

import { useState } from 'react';
import { FaInstagram, FaTiktok, FaTimesCircle } from 'react-icons/fa';

export default function EarnPage() {
  const [tab, setTab] = useState('Rewards');
  return (
    <div className="flex h-screen w-full bg-black">
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Content Rewards Card */}
        <div className="flex flex-col w-[480px] min-w-[320px] max-w-[520px] h-full border-r border-zinc-800 bg-[#18191c]">
          {/* Header */}
          <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
              <img src="/gold-logo.PNG" alt="Meta Mansions Logo" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <div className="font-bold text-lg text-white">Meta Mansions University</div>
              <div className="text-green-400 text-xs font-medium flex items-center gap-1"><span className="inline-block w-2 h-2 bg-green-500 rounded-full" />35 online</div>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex border-b border-zinc-800 bg-[#18191c]">
            {['Home', 'Chat', 'Earn', 'Learn'].map((t) => (
              <button
                key={t}
                className={`flex-1 py-3 text-sm font-semibold transition-colors cursor-pointer ${t === 'Earn' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-zinc-400'}`}
                onClick={() => {
                  if (t === 'Earn') return;
                  if (t === 'Learn') window.location.href = '/auth/learn';
                  else if (t === 'Chat') window.location.href = '/auth/chat';
                  else window.location.href = '/auth';
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {/* Content Rewards Card */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="bg-zinc-900 rounded-xl p-4 shadow border border-blue-900">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded bg-green-700 flex items-center justify-center"><img src="/content-rewards.png" alt="Content Rewards" className="w-5 h-5" /></span>
                <span className="text-white font-semibold text-base">Content Rewards</span>
              </div>
              <div className="font-bold text-white text-lg mb-1">FLASH CONTENT REWARD — Control Center</div>
              <div className="text-zinc-400 text-xs mb-2">$5,000 of $5,000 paid out</div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-2">
                <div className="h-2 bg-orange-400 rounded-full" style={{ width: '100%' }} />
              </div>
              <div className="flex items-center gap-4 text-xs mb-2">
                <span className="text-white">100%</span>
              </div>
              <div className="flex gap-4 text-xs mb-2">
                <div>
                  <div className="text-zinc-400">Type</div>
                  <div className="text-white">UGC</div>
                </div>
                <div>
                  <div className="text-zinc-400">Platforms</div>
                  <div className="flex gap-2 items-center">
                    <FaInstagram className="text-pink-500" />
                    <FaTiktok className="text-black bg-white rounded" />
                    <FaTimesCircle className="text-zinc-500" />
                  </div>
                </div>
                <div>
                  <div className="text-zinc-400">$ / views</div>
                  <div className="text-blue-400 font-semibold">$50.00 + $10.00 / 1K</div>
                </div>
                <div>
                  <div className="text-zinc-400">Online</div>
                  <div className="text-green-400">3 online</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Content Rewards Panel */}
        <div className="flex-1 flex flex-col bg-[#18191c] h-full overflow-y-auto">
          {/* Header */}
          <div className="px-10 pt-10 pb-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded bg-green-700 flex items-center justify-center"><img src="/content-rewards.png" alt="Content Rewards" className="w-5 h-5" /></span>
              <span className="text-white font-bold text-xl">Content Rewards</span>
            </div>
            <div className="flex gap-6 text-sm">
              <button className={`text-white font-semibold pb-2 border-b-2 ${tab === 'Rewards' ? 'border-yellow-400' : 'border-transparent'} cursor-pointer`} onClick={() => setTab('Rewards')}>Rewards</button>
              <button className={`text-white font-semibold pb-2 border-b-2 ${tab === 'My submissions' ? 'border-yellow-400' : 'border-transparent'} cursor-pointer`} onClick={() => setTab('My submissions')}>My submissions</button>
            </div>
          </div>
          {/* Content */}
          {tab === 'Rewards' && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <img src="/content-rewards-empty.png" alt="No Content Rewards" className="w-64 h-64 object-contain mb-6" />
              <div className="text-2xl font-bold text-zinc-100 mb-2">No active <span className="text-yellow-300">Content Rewards</span></div>
              <div className="text-zinc-400 text-base">There are no active Content Rewards.</div>
            </div>
          )}
          {tab === 'My submissions' && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-zinc-400 text-base">No submissions yet.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 