"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const messages = [
  {
    id: 1,
    name: "Team Meta Mansions",
    preview: "Team Meta Mansions: Welcome to Meta Mansions! We'd love to help you get started...",
    date: "Thu",
    unread: true,
    group: false,
    requests: false,
    avatar: "/gold-logo.PNG",
    verified: true,
  },
];

export default function MessagesPage() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="flex h-screen w-full bg-black text-white">
      {/* Sidebar */}
      <div className="w-[380px] min-w-[320px] max-w-[420px] h-full border-r border-zinc-800 bg-[#18191c] flex flex-col">
        {/* Search and Tabs */}
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <input
                className="w-full bg-zinc-900 rounded-full px-4 py-2 text-sm text-white outline-none border border-zinc-700 focus:border-yellow-400"
                placeholder="Search..."
              />
              <FaSearch className="absolute right-3 top-2.5 text-zinc-500 w-4 h-4" />
            </div>
            <button className="ml-2 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0V9H9a1 1 0 1 1 0-2h2V5a1 1 0 0 1 1-1Z"/></svg>
            </button>
          </div>
          <div className="flex gap-2 mb-2">
            <button className="px-4 py-1.5 rounded-full font-semibold text-xs bg-blue-900 text-white">Unread 1</button>
            <button className="px-4 py-1.5 rounded-full font-semibold text-xs bg-zinc-800 text-zinc-300">Groups</button>
            <button className="px-4 py-1.5 rounded-full font-semibold text-xs bg-zinc-800 text-zinc-300">Requests</button>
          </div>
        </div>
        {/* Message List */}
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-zinc-800 hover:bg-zinc-800 transition ${selected === msg.id ? "bg-zinc-800" : ""}`}
              onClick={() => setSelected(msg.id)}
            >
              <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full bg-zinc-700" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-white text-sm truncate">{msg.name}</span>
                  {msg.verified && <span className="ml-1 text-xs">✔️</span>}
                </div>
                <div className="text-xs text-zinc-400 truncate max-w-[180px]">{msg.preview}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-zinc-400">{msg.date}</span>
                {msg.unread && <span className="w-2 h-2 bg-blue-500 rounded-full block" />}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Main Panel */}
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="bg-zinc-900 rounded-2xl p-10 flex flex-col items-center justify-center shadow-lg min-w-[320px] max-w-[400px] mx-auto">
          <div className="text-white text-lg font-bold mb-2 text-center">Select a message</div>
          <div className="text-zinc-400 text-sm text-center mb-4">Choose from your existing conversations, start a new one, or just keep swimming.</div>
          <div className="text-5xl">👀</div>
        </div>
      </div>
    </div>
  );
} 