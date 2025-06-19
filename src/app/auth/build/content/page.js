"use client";

import { useState } from 'react';
import { FaRegSmile, FaRegImage } from 'react-icons/fa';
import { BsFillCalendar2EventFill } from 'react-icons/bs';

const tabs = [
  'Home', 'Chat', 'Earn', 'Learn', 'Calendar', 'Play', 'Tools', 'Integrations'
];

export default function AddContentPage() {
  const [activeTab, setActiveTab] = useState('Home');
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header with logo and name */}
      <div className="flex items-center gap-4 px-8 pt-6 pb-2">
        <img src="/gold-logo.PNG" alt="Meta Mansion Logo" className="w-16 h-16 object-contain rounded-full border-4 border-black bg-zinc-900" />
        <div className="flex flex-col">
          <span className="text-xl font-bold text-white">Chroma AI</span>
          <span className="text-sm text-zinc-400">1 online</span>
        </div>
        <div className="flex-1" />
        {/* Placeholder for icons */}
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-zinc-800" />
          <div className="w-8 h-8 rounded-full bg-zinc-800" />
          <div className="w-8 h-8 rounded-full bg-zinc-800" />
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-2 px-8 border-b border-zinc-800 mb-2">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tab ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-white'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Post input */}
      <div className="px-8 py-4">
        <div className="bg-zinc-900 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold">GL</div>
            <input
              className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none border-none text-base"
              placeholder="Write something..."
            />
            <button className="text-zinc-400 hover:text-blue-500"><FaRegImage size={20} /></button>
            <button className="text-zinc-400 hover:text-blue-500"><FaRegSmile size={20} /></button>
            <button className="text-zinc-400 hover:text-blue-500"><BsFillCalendar2EventFill size={20} /></button>
            <button className="ml-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">Post</button>
          </div>
          <div className="flex items-center gap-2">
            <select className="bg-zinc-800 text-zinc-400 text-xs rounded px-2 py-1">
              <option>Announcements</option>
            </select>
          </div>
        </div>
      </div>
      {/* Announcement card */}
      <div className="px-8">
        <div className="bg-zinc-900 rounded-xl p-4 mt-2 flex flex-col items-center">
          <span className="text-white font-semibold text-lg">Chroma AI</span>
          <span className="text-zinc-400 text-sm mt-1">Welcome users when they join your Meta Mansion with your first post</span>
        </div>
      </div>
    </div>
  );
} 