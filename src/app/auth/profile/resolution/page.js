"use client";

import { BsEmojiSmile } from 'react-icons/bs';
import { FiChevronDown } from 'react-icons/fi';

export default function ResolutionCenterPage() {
  const headers = [
    { id: 'reason', label: 'Reason' },
    { id: 'status', label: 'Status' },
    { id: 'meta-mansions', label: 'Meta Mansions' },
    { id: 'amount', label: 'Amount' },
    { id: 'openedOn', label: 'Opened on' },
    { id: 'dueDate', label: 'Due date' },
    { id: 'closedOn', label: 'Closed on' }
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col px-12 py-10">
      {/* Table Headers */}
      <div className="grid grid-cols-7 gap-4 border-b border-zinc-800 pb-4 mb-20">
        {headers.map((header) => (
          <div key={header.id} className="flex items-center gap-1 text-gray-500 text-sm font-medium">
            {header.label}
            <button className="hover:bg-zinc-800 rounded p-0.5 transition-colors">
              <FiChevronDown size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-6 bg-zinc-800/50 p-4 rounded-lg">
          <BsEmojiSmile className="w-12 h-12 text-gray-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No resolution cases yet</h2>
        <p className="text-gray-500">
          When you report an issue with a Meta Mansions membership, it will be listed here.
        </p>
      </div>
    </div>
  );
} 