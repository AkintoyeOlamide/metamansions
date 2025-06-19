"use client";
import { useState } from 'react';
import { FiHome, FiUsers, FiCreditCard, FiDollarSign, FiSettings, FiChevronRight, FiChevronDown, FiBarChart2, FiUserCheck, FiMessageCircle, FiBell, FiMenu, FiBox, FiLayers, FiUser, FiCheckCircle } from 'react-icons/fi';
import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa';
import PaymentSetupModal from '@/components/PaymentSetupModal';
import SelectCountryModal from '@/components/SelectCountryModal';
import GetFirstUserModal from '@/components/GetFirstUserModal';
import { useRouter } from 'next/navigation';

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

export default function BuildMetaMansion() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [checklist, setChecklist] = useState(checklistItems);
  const [sidebarName, setSidebarName] = useState('');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [getFirstUserModalOpen, setGetFirstUserModalOpen] = useState(false);
  const router = useRouter();

  // Only one item can be checked at a time
  const toggleChecklist = idx => {
    setChecklist(list =>
      list.map((item, i) => ({ ...item, complete: i === idx ? !item.complete : false }))
    );
  };

  // Only one can be checked, so count if any is checked
  const anyChecked = checklist.some(item => item.complete);
  const checkedCount = checklist.filter(item => item.complete).length;

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
              <span className="text-lg font-bold text-white">Build your Meta Mansion</span>
              <img src="/gold-logo.PNG" alt="Meta Mansion Logo" className="w-12 h-12 object-contain" />
            </div>
            <div className="text-zinc-400 text-xs mb-1">Complete the checklist below</div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-24 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-2 bg-[#FFD700] rounded-full" style={{ width: `${(checkedCount/5)*100}%` }} />
              </div>
              <span className="text-xs text-[#FFD700] font-semibold">{checkedCount} / 5 complete</span>
            </div>
            <div className="flex items-center bg-zinc-800 rounded px-2 py-1 mb-2">
              <span className="text-zinc-400 text-xs">keyz.xyz/greencandles</span>
              <button className="ml-auto px-2 py-1 rounded bg-zinc-700 text-zinc-200 text-xs hover:bg-zinc-600 transition">Copy</button>
            </div>
            {/* Checklist */}
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 divide-y divide-zinc-800">
              {checklist.map((item, idx) => (
                <div
                  key={item.label}
                  className="flex items-center px-3 py-2 hover:bg-zinc-800 transition cursor-pointer"
                  onClick={() => {
                    toggleChecklist(idx);
                    if (item.label === 'Set up meta mansion payments') {
                      setPaymentModalOpen(true);
                    } else if (item.label === 'Add content to your meta mansion') {
                      router.push('/auth/build/content');
                    } else if (item.label === 'Invite your 1st user') {
                      setGetFirstUserModalOpen(true);
                    }
                  }}
                >
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
                setCheckoutModalOpen(true);
              }
            }}
          >
            + Create checkout link
          </button>
        </div>
      </main>

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto p-0 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-zinc-800">
              <div className="flex-1 flex justify-center">
                <span className="text-lg font-semibold text-white">Copy your Meta Mansion link</span>
              </div>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="text-zinc-400 hover:text-white text-2xl font-bold ml-2"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            {/* Modal Body */}
            <div className="px-6 pt-4 pb-2 flex flex-col items-center">
              <div className="text-zinc-400 text-center text-sm mb-6">Click to copy your Meta Mansion link and share it across social media.</div>
              <div className="w-full flex items-center bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 mb-6">
                <span className="text-zinc-400 text-base select-none">metamansions.com/</span>
                <span className="text-white text-base font-semibold select-all">chromaai</span>
                <button
                  className="ml-auto text-zinc-400 hover:text-yellow-400 p-1"
                  onClick={() => {
                    navigator.clipboard.writeText('metamansions.com/chromaai');
                  }}
                  aria-label="Copy link"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16.5V18a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0020 18v-7.5A2.25 2.25 0 0017.75 8H16.5m-10.5 6.75V6A2.25 2.25 0 018.25 3.75h7.5A2.25 2.25 0 0118 6v7.5A2.25 2.25 0 0115.75 15H8.25A2.25 2.25 0 016 12.75z" />
                  </svg>
                </button>
              </div>
              <button
                className="w-full py-2 rounded-lg bg-zinc-800 text-zinc-500 font-semibold text-base cursor-not-allowed mb-2"
                disabled
              >
                Save link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Setup Modal */}
      <PaymentSetupModal 
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onStart={() => {
          setPaymentModalOpen(false);
          setCountryModalOpen(true);
        }}
      />
      <SelectCountryModal isOpen={countryModalOpen} onClose={() => setCountryModalOpen(false)} />
      <GetFirstUserModal isOpen={getFirstUserModalOpen} onClose={() => setGetFirstUserModalOpen(false)} />
    </div>
  );
} 