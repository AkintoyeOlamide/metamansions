"use client";
import { useState } from 'react';
import OnboardingBottomBar from './OnboardingBottomBar';

export default function OnboardingLink() {
  const [link, setLink] = useState('');
  const maxLength = 30;

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="w-full border-b border-zinc-800 pt-3">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-white ml-2">Onboarding</h1>
          <button className="px-4 py-1 border border-zinc-600 rounded-lg text-sm text-white hover:bg-zinc-800 transition">Contact sales</button>
        </div>
      </div>
      {/* Centered Card */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-zinc-900 rounded-xl shadow-lg p-8 flex flex-col items-center">
          <h2 className="text-xl font-bold text-white mb-2 text-center">Choose your Whop link</h2>
          <p className="text-zinc-400 text-sm mb-6 text-center">This is the link you send to your customers.</p>
          <div className="w-full mb-6">
            <div className="flex items-center w-full">
              <span className="px-3 py-2 rounded-l bg-zinc-800 text-zinc-400 border border-zinc-700 border-r-0 text-sm select-none">whop.com/</span>
              <input
                type="text"
                value={link}
                onChange={e => {
                  if (e.target.value.length <= maxLength) setLink(e.target.value);
                }}
                placeholder="wealthgroup"
                className="w-full px-4 py-2 rounded-r bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-400 outline-none text-base border-l-0"
              />
            </div>
            <div className="text-right text-xs text-zinc-500 mt-1">{link.length} / {maxLength}</div>
          </div>
          <button
            className="w-full py-2 rounded bg-zinc-800 text-zinc-400 font-semibold text-base transition cursor-not-allowed"
            disabled={!link.trim()}
          >
            Continue
          </button>
        </div>
      </div>
      <OnboardingBottomBar />
    </div>
  );
} 