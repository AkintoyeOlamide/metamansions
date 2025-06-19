"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { FaFlag, FaBullhorn, FaBook, FaComments, FaGift } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function AuthDashboard() {
  const [tab, setTab] = useState('Home');
  const [modalOpen, setModalOpen] = useState(true);
  const modalRef = useRef(null);
  const router = useRouter();
  // Modal options
  const modalOptions = [
    { icon: <FaFlag className="text-blue-400 w-6 h-6" />, label: 'Meta Mansions Chat', shortcut: '⌘1' },
    { icon: <FaBullhorn className="text-orange-400 w-6 h-6" />, label: 'Announcements', shortcut: '⌘2' },
    { icon: <FaBook className="text-yellow-400 w-6 h-6" />, label: 'Meta Mansions Course', shortcut: '⌘3' },
    { icon: <FaComments className="text-pink-400 w-6 h-6" />, label: 'Genius Bar', shortcut: '⌘4' },
    { icon: <FaGift className="text-green-400 w-6 h-6" />, label: 'Content Rewards', shortcut: '⌘5' },
  ];

  useEffect(() => {
    if (!modalOpen) return;
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [modalOpen]);

  return (
    <div className="flex h-screen w-full bg-black">
      {/* Modal overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div ref={modalRef} className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl w-full max-w-md mx-auto p-0 overflow-hidden">
            <div className="px-8 pt-7 pb-2 border-b border-zinc-800">
              <div className="text-zinc-200 text-lg font-semibold mb-1">Where would you like to go?</div>
            </div>
            <div className="divide-y divide-zinc-800">
              {modalOptions.map((opt, idx) => (
                <div key={opt.label} className={`flex items-center gap-4 px-8 py-4 hover:bg-zinc-800 transition cursor-pointer ${idx === 0 ? 'bg-zinc-800' : ''}`}>
                  {opt.icon}
                  <span className="flex-1 text-white font-medium text-base">{opt.label}</span>
                  <span className="text-zinc-500 text-xs font-mono">{opt.shortcut}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Sidebar is handled globally */}
      {/* Main Content */}
      {tab === 'Chat' ? (
        <div className="flex flex-1 overflow-hidden">
          {/* Left Chat List/Panel */}
          <div className="flex flex-col w-[420px] min-w-[320px] max-w-[480px] h-full border-r border-zinc-800 bg-[#18191c]">
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                <img src="/whop-bowl.png" alt="Meta Mansions University" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <div className="font-bold text-lg text-white">Meta Mansions University</div>
                <div className="text-green-400 text-xs font-medium flex items-center gap-1"><span className="inline-block w-2 h-2 bg-green-500 rounded-full" />44 online</div>
              </div>
            </div>
            {/* Tabs */}
            <div className="flex border-b border-zinc-800 bg-[#18191c]">
              {['Home', 'Chat', 'Earn', 'Learn'].map((t) => (
                <button
                  key={t}
                  className={`flex-1 py-3 text-sm font-semibold transition-colors cursor-pointer ${t === 'Chat' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-zinc-400'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            {/* Chat List/Feed */}
            <div className="flex-1 overflow-y-auto p-4">
              <div
                className="bg-zinc-900 rounded-lg p-4 flex flex-col gap-2 shadow border border-zinc-800 cursor-pointer hover:bg-zinc-800 transition"
                onClick={() => router.push('/auth/chat')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">🍹</div>
                  <span className="text-white font-semibold text-sm">Meta Mansions Chat</span>
                  <span className="text-zinc-500 text-xs ml-auto">24 online</span>
                </div>
                <div className="text-zinc-400 text-xs">i know what kinda man you are</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-700" />
                  <span className="text-white text-xs">Abhay</span>
                  <span className="text-zinc-500 text-xs">same</span>
                </div>
              </div>
            </div>
          </div>
          {/* Right Chat Panel */}
          <div className="flex-1 flex flex-col bg-[#18191c] h-full">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#18191c]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">🍹</div>
                <span className="font-bold text-lg text-white">Meta Mansions Chat</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-zinc-400">Pinned Message (1/2)</span>
                <button className="text-zinc-400 hover:text-white"><i className="fa fa-info-circle" /></button>
                <button className="text-zinc-400 hover:text-white"><i className="fa fa-bell" /></button>
                <input className="bg-zinc-800 rounded-lg px-3 py-2 border border-zinc-700 text-sm text-white placeholder-zinc-400 w-40 md:w-64 ml-4" placeholder="Search..." />
                <span className="ml-2 text-zinc-500 text-xs hidden md:inline">⌘K</span>
              </div>
            </div>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              <div className="bg-zinc-800 rounded-lg p-4">
                <div className="text-zinc-400 text-xs mb-2">TYPE /HELP IN CHAT TO ACTIVATE OUR 24/7 HELP BOT!</div>
                <div className="text-white text-sm mb-1">Can anyone tell me, how to use this application?</div>
                <div className="text-zinc-500 text-xs">Read by 7</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-700" />
                  <span className="text-white text-xs">Aaditya Khatri</span>
                  <span className="text-zinc-500 text-xs">12:57am</span>
                </div>
                <div className="text-white text-sm">hlo ankit</div>
                <div className="text-zinc-500 text-xs">Read by 6</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-700" />
                  <span className="text-white text-xs">TheDon</span>
                </div>
                <div className="text-white text-sm">1535061070337221021</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-700" />
                  <span className="text-white text-xs">Zap</span>
                  <span className="text-zinc-500 text-xs">12:57am</span>
                </div>
                <div className="text-white text-sm">i know what kinda man you are</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-400 text-xs">😊</span>
                  <span className="text-zinc-400 text-xs">1</span>
                  <span className="text-zinc-400 text-xs">⏰</span>
                </div>
                <div className="text-zinc-500 text-xs">Read by 6</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-700" />
                  <span className="text-white text-xs">Muhamad Sigit</span>
                </div>
                <div className="text-white text-sm">Can anyone tell me, how to use this application?</div>
                <div className="text-zinc-500 text-xs">Read by 3</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-700" />
                  <span className="text-white text-xs">Abhay</span>
                  <span className="text-zinc-500 text-xs">12:57am</span>
                </div>
                <div className="text-white text-sm">same</div>
                <div className="text-zinc-500 text-xs">Read by 3</div>
              </div>
            </div>
            {/* Chat Input */}
            <div className="border-t border-zinc-800 px-8 py-4 bg-[#18191c] flex items-center gap-2">
              <input className="flex-1 bg-zinc-800 rounded-full px-4 py-2 text-sm text-gray-200 outline-none" placeholder="Type a message..." />
              <button className="bg-zinc-800 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-700 transition">Send</button>
            </div>
          </div>
        </div>
      ) : tab === 'Learn' ? (
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
                    if (t === 'Learn') router.push('/auth/learn');
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
      ) : (
        // Default layout for other tabs
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
                <div className="w-14 h-14 bg-zinc-900 rounded-lg flex items-center justify-center text-xs text-white border border-zinc-700">Meta Mansions Chat</div>
                <div className="w-14 h-14 bg-zinc-900 rounded-lg flex items-center justify-center text-xs text-white border border-zinc-700">Meta Mansions University</div>
              </div>
            </div>
            {/* Tabs */}
            <div className="flex border-b border-zinc-800 bg-[#18191c]">
              {['Home', 'Chat', 'Earn', 'Learn'].map((t) => (
                <button
                  key={t}
                  className={`flex-1 py-3 text-sm font-semibold transition-colors cursor-pointer ${t === tab ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-zinc-400'}`}
                  onClick={() => {
                    if (t === 'Discover') router.push('/auth/discover');
                    else if (t === 'Learn') router.push('/auth/learn');
                    else if (t === 'Earn') router.push('/auth/earn');
                    else setTab(t);
                  }}
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
                <img src="/whop-bowl.png" alt="Welcome to Meta Mansions" className="w-32 h-32 object-contain mx-auto" />
              </div>
              <div className="text-white text-xl font-bold mb-2 text-center">Welcome to Meta Mansions <span role="img" aria-label="house">🏠</span></div>
              <div className="text-zinc-400 text-sm text-center mb-2">Select a post or app to open it here</div>
            </div>
          </div>
        </div>
      )}
      {/* Bottom bar and other overlays handled globally */}
    </div>
  );
} 