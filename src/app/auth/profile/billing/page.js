"use client";

import { FiSearch } from 'react-icons/fi';
import { BsCheckCircleFill } from 'react-icons/bs';
import Image from 'next/image';

export default function BillingHistoryPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col px-12 py-10">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-white mb-6">Billing history</h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-500" size={20} />
        </div>
        <input
          type="text"
          placeholder="Search orders"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#FFD700]/50"
        />
      </div>

      {/* Transaction List */}
      <div className="space-y-2">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex items-center justify-between group hover:bg-zinc-900/80 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative">
              <Image
                src="/gold-logo.PNG"
                alt="Meta Mansions Logo"
                width={32}
                height={32}
                className="rounded"
              />
            </div>
            <div>
              <h3 className="text-white font-medium">Meta Mansions</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">$0.00</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">3 days ago</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-emerald-500">
            <BsCheckCircleFill size={16} />
            <span className="font-medium">Paid</span>
          </div>
        </div>
      </div>
    </div>
  );
} 