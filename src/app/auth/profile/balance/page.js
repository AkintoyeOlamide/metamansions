"use client";

import { useState } from 'react';
import { FiInfo, FiFilter } from 'react-icons/fi';
import { RiRocketLine } from 'react-icons/ri';
import PaymentSetupModal from '@/components/PaymentSetupModal';

export default function BalancePage() {
  const [activeTab, setActiveTab] = useState('withdrawals');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black flex flex-col px-12 py-10">
      {/* Setup Banner */}
      <div className="bg-[#1a2744] rounded-lg p-4 mb-8 flex items-center justify-between">
        <span className="text-gray-300">Set up your payment accounts to get paid fast.</span>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-1.5 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-[#FFD700]/90 transition-colors"
        >
          Set up Meta Mansion Payments
        </button>
      </div>

      {/* Balance Overview */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Balance overview</h1>
        <button className="px-4 py-1.5 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-700 transition-colors">
          Withdraw to bank
        </button>
      </div>

      {/* Balance Summary */}
      <h2 className="text-lg font-semibold text-white mb-4">Balance summary</h2>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Available to pay out to your bank</span>
            </div>
            <span className="text-white">$0.00</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Available to pay out soon</span>
              <FiInfo className="text-gray-500" />
            </div>
            <span className="text-white">$0.00</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
            <span className="font-semibold text-white">Total</span>
            <span className="font-semibold text-white">$0.00</span>
          </div>
        </div>
      </div>

      {/* Transactions Tabs */}
      <div className="border-b border-zinc-800">
        <div className="flex gap-8">
          {['Withdrawals', 'Deposits', 'Deductions'].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-1 text-sm font-medium transition-colors ${
                activeTab === tab.toLowerCase()
                  ? 'text-[#FFD700] border-b-2 border-[#FFD700]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 py-4 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          Amount
          <FiFilter className="text-gray-500" />
        </div>
        <div className="flex items-center gap-2">
          Status
          <FiFilter className="text-gray-500" />
        </div>
        <div className="flex items-center gap-2">
          Initiated
          <FiFilter className="text-gray-500" />
        </div>
        <div className="flex items-center gap-2">
          Expected date
          <FiFilter className="text-gray-500" />
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 text-gray-500">
        <div className="bg-zinc-800/50 p-4 rounded-lg mb-4">
          <RiRocketLine size={32} />
        </div>
        <p>No transactions yet</p>
      </div>

      {/* Payment Setup Modal */}
      <PaymentSetupModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
} 