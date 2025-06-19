"use client";

import Link from 'next/link';
import { useState } from 'react';
import { RiMoneyDollarBoxFill } from 'react-icons/ri';

export default function MembershipsPage() {
  const [activeTab, setActiveTab] = useState('active');
  
  const tabs = [
    { id: 'active', label: 'Active' },
    { id: 'one-time', label: 'One-time' },
    { id: 'awaiting', label: 'Awaiting approval' },
    { id: 'inactive', label: 'Inactive' }
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col px-12 py-10">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-zinc-800 mb-20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-400'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700]" />
            )}
          </button>
        ))}
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-6 bg-zinc-800/50 p-8 rounded-full">
          <RiMoneyDollarBoxFill className="w-24 h-24 text-[#FFD700]" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-8">
          When you purchase a product on Meta Mansions, it will show up here.
        </p>
        <Link
          href="/browse"
          className="px-6 py-2 bg-[#FFD700] text-black font-medium rounded-lg hover:bg-[#FFD700]/90 transition-colors"
        >
          Browse Meta Mansions
        </Link>
      </div>
    </div>
  );
} 