"use client";
import { useState } from 'react';
import { FiHome, FiUsers, FiCreditCard, FiDollarSign, FiSettings, FiChevronRight, FiChevronDown, FiBarChart2, FiUserCheck, FiMessageCircle, FiBell, FiMenu, FiBox, FiLayers, FiUser, FiCheckCircle } from 'react-icons/fi';
import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa';
import OnboardingBottomBar from '../OnboardingBottomBar';

const sidebarItems = [
  { label: 'Home', icon: FiHome },
  { label: 'Your mansions', icon: FiBox },
  { label: 'Checkout links', icon: FiCreditCard },
  { label: 'Users', icon: FiUsers },
  { label: 'Payments', icon: FiDollarSign },
  { label: 'Payouts', icon: FiBarChart2 },
  { label: 'Resolution center', icon: FiUserCheck },
  { label: 'Dispute fighter', icon: FiLayers },
  { label: 'Settings', icon: FiSettings },
  { label: 'Team', icon: FiUser },
  { label: 'Marketing', icon: FiMenu, dropdown: true },
  { label: 'Developer', icon: FiChevronRight },
];

const checklistItems = [
  { label: 'Claim your meta mansion link', complete: false },
  { label: 'Set up meta mansion payments', complete: false },
  { label: 'Add content to your meta mansion', complete: false },
  { label: 'Design your meta mansion', complete: false },
  { label: 'Invite your 1st user', complete: false },
];

export default function OnboardingDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [checklist, setChecklist] = useState(checklistItems);
  const [sidebarName, setSidebarName] = useState('');

  const toggleChecklist = idx => {
    setChecklist(list =>
      list.map((item, i) => (i === idx ? { ...item, complete: !item.complete } : item))
    );
  };

  // Add a derived value to check if any checklist item is complete
  const anyChecked = checklist.some(item => item.complete);

  return (
    <div className="h-screen bg-black flex flex-row overflow-hidden">
      {/* Sidebar */}
      <aside className="w-40 border-r border-zinc-800 flex flex-col py-0" style={{paddingLeft: 0, marginLeft: 0}}>
        <div className="flex items-center mb-0 mt-0" style={{paddingLeft: 0, marginLeft: 0}}>
          <span className="text-lg font-semibold text-white">{sidebarName}</span>
        </div>
        <nav className="flex-1" style={{paddingLeft: 0, marginLeft: 0}}>
          {sidebarItems.map((item, idx) => (
            <div key={item.label} className={`flex items-center py-2 text-zinc-300 hover:bg-zinc-800 cursor-pointer group${idx === 0 ? ' mt-0' : ''}`} style={{paddingLeft: 0, marginLeft: 0}}>
              <item.icon className="mr-3 text-lg" />
              <span className="flex-1 text-sm">{item.label}</span>
              {item.dropdown && (
                <button onClick={() => setDropdownOpen(v => !v)} className="ml-auto">
                  {dropdownOpen ? <FiChevronDown /> : <FiChevronRight />}
                </button>
              )}
            </div>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-0">
        {/* Top bar */}
        <div className="flex items-center justify-end px-0 py-0 border-b border-zinc-800 min-h-[28px]">
          <div className="flex items-center gap-4">
            <input className="px-3 py-1 rounded bg-zinc-800 text-zinc-200 text-sm border border-zinc-700 focus:border-yellow-400 outline-none mb-2 mt-4" placeholder="Search..." />
            <button className="px-4 py-1 rounded bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold text-sm transition mb-2 mt-4">New Mansion</button>
          </div>
        </div>
        {/* Centered content */}
        <div className="flex-1 flex flex-col items-center overflow-y-auto max-h-[calc(100vh-64px)] mt-8">
          {/* Card */}
          <div className="w-full max-w-md bg-zinc-900 rounded-xl shadow-lg p-4 mb-2 mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg font-bold text-white">Get your Meta Mansion ready</span>
              <img src="/gold-logo.PNG" alt="Meta Mansion Logo" className="w-12 h-12 object-contain" />
            </div>
            <div className="text-zinc-400 text-xs mb-1">Complete the checklist below</div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-24 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-2 bg-[#FFD700] rounded-full" style={{ width: '20%' }} />
              </div>
              <span className="text-xs text-[#FFD700] font-semibold">1 / 5 complete</span>
            </div>
            <div className="flex items-center bg-zinc-800 rounded px-2 py-1 mb-2">
              <span className="text-zinc-400 text-xs">keyz.xyz/greencandles</span>
              <button className="ml-auto px-2 py-1 rounded bg-zinc-700 text-zinc-200 text-xs hover:bg-zinc-600 transition">Copy</button>
            </div>
            {/* Checklist */}
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 divide-y divide-zinc-800">
              {checklist.map((item, idx) => (
                <div key={item.label} className="flex items-center px-3 py-2 hover:bg-zinc-800 transition cursor-pointer" onClick={() => toggleChecklist(idx)}>
                  {item.complete ? <FaRegCheckCircle className="text-[#FFD700] mr-2" /> : <FaRegCircle className="text-zinc-500 mr-2" />}
                  <span className="flex-1 text-sm text-white">{item.label}</span>
                  <FiChevronRight className="text-zinc-500" />
                </div>
              ))}
            </div>
          </div>
          {/* Centered text with lines above the button */}
          <div className="flex items-center w-full max-w-md mt-4 mb-4">
            <div className="flex-1 h-px bg-zinc-700" />
            <span className="mx-2 text-xs text-zinc-400 whitespace-nowrap">Have a customer ready to pay?</span>
            <div className="flex-1 h-px bg-zinc-700" />
          </div>
          {/* Create checkout link button */}
          <button
            className={`w-full max-w-md py-1.5 rounded font-semibold text-base transition ${anyChecked ? 'bg-[#FFD700] text-black cursor-pointer hover:bg-yellow-400' : 'bg-zinc-800 text-zinc-400 cursor-not-allowed'}`}
            disabled={!anyChecked}
            onClick={() => {
              if (anyChecked) {
                window.location.href = '/auth';
              }
            }}
          >
            + Create checkout link
          </button>
        </div>
      </main>
      <OnboardingBottomBar />
    </div>
  );
} 