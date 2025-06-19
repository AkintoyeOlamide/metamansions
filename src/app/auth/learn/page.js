"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LearnPage() {
  const router = useRouter();
  return (
    <div className="flex h-screen w-full bg-black">
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Course Card */}
        <div className="flex flex-col w-[420px] min-w-[320px] max-w-[480px] h-full border-r border-zinc-800 bg-[#18191c]">
          {/* Header */}
          <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
              <img src="/whop-bowl.png" alt="Meta Mansions University" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <div className="font-bold text-lg text-white">Meta Mansions University</div>
              <div className="text-green-400 text-xs font-medium flex items-center gap-1"><span className="inline-block w-2 h-2 bg-green-500 rounded-full" />34 online</div>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex border-b border-zinc-800 bg-[#18191c]">
            {['Home', 'Chat', 'Earn', 'Learn'].map((t) => (
              <button
                key={t}
                className={`flex-1 py-3 text-sm font-semibold transition-colors cursor-pointer ${t === 'Learn' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-zinc-400'}`}
                onClick={() => {
                  if (t === 'Discover') router.push('/auth/discover');
                  else if (t === 'Learn') router.push('/auth/learn');
                  else if (t === 'Earn') router.push('/auth/earn');
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {/* Course Card */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="bg-blue-950 rounded-xl p-4 flex flex-col gap-2 shadow border border-blue-900">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded bg-blue-900 flex items-center justify-center"><span className="text-2xl">📚</span></div>
                <span className="text-white font-semibold text-base">Meta Mansions Course</span>
                <span className="text-green-400 text-xs ml-auto">15 online</span>
              </div>
              <div className="text-white font-bold text-lg">Learning Library</div>
              <div className="text-zinc-300 text-sm">Course • Your hub for courses, workshops, and coaching call recordings.</div>
            </div>
          </div>
        </div>
        {/* Right: Learning Library Panel */}
        <div className="flex-1 flex flex-col bg-[#18191c] h-full overflow-y-auto">
          {/* Header */}
          <div className="px-10 pt-10 pb-4 border-b border-zinc-800 bg-gradient-to-r from-[#232323] to-[#232323]">
            <div className="text-4xl font-extrabold text-white mb-2">Learning Library</div>
            <button className="bg-zinc-800 text-white font-semibold px-6 py-2 rounded-lg text-lg mt-2">Start</button>
          </div>
          {/* Modules */}
          <div className="p-8 space-y-8">
            {/* Module 1 */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <div className="font-bold text-lg text-white mb-1">Module 1: Introduction to Meta Mansions</div>
              <div className="text-zinc-400 text-xs mb-4">0% complete. Let's get started.</div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-4">
                <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '0%' }} />
              </div>
              <ul className="space-y-2">
                <li className="flex items-center justify-between text-white text-sm">
                  <span>What is Meta Mansions?</span>
                  <span className="text-zinc-400 text-xs">3:53</span>
                </li>
                <li className="flex items-center justify-between text-white text-sm">
                  <span>Backstory Of Meta Mansions</span>
                  <span className="text-zinc-400 text-xs">3:26</span>
                </li>
                <li className="flex items-center justify-between text-white text-sm">
                  <span>How to make money on Meta Mansions</span>
                  <span className="text-zinc-400 text-xs">3:20</span>
                </li>
                <li className="flex items-center justify-between text-white text-sm">
                  <span>Meta Mansions 101</span>
                  <span className="text-zinc-400 text-xs">9:57</span>
                </li>
                <li className="flex items-center justify-between text-white text-sm">
                  <span>How to create a Meta Mansions</span>
                  <span className="text-zinc-400 text-xs">4:11</span>
                </li>
              </ul>
            </div>
            {/* Module 2 */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <div className="font-bold text-lg text-white mb-1">Module 2: Using Meta Mansions Apps</div>
              <div className="text-zinc-400 text-xs mb-4">0% complete. Let's get started.</div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-4">
                <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '0%' }} />
              </div>
              <ul className="space-y-2">
                <li className="flex items-center justify-between text-white text-sm">
                  <span>App Overview</span>
                  <span className="text-zinc-400 text-xs">2:45</span>
                </li>
                <li className="flex items-center justify-between text-white text-sm">
                  <span>Connecting Your Account</span>
                  <span className="text-zinc-400 text-xs">4:10</span>
                </li>
                <li className="flex items-center justify-between text-white text-sm">
                  <span>Managing Your Library</span>
                  <span className="text-zinc-400 text-xs">3:05</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 