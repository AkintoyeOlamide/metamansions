"use client";

import { useState } from "react";

const notifications = [
  {
    id: 1,
    name: "Zap",
    avatar: "/gold-logo.PNG",
    message: "Tell us what you're building or clipping below @everyone It's June 1st, let's make it the most profitable month yet Let's get eyes on your work and help each other grow.",
    date: "Yesterday, 11:53 PM",
    section: "latest",
  },
  {
    id: 2,
    name: "eric",
    avatar: "/gold-logo.PNG",
    message: "@everyone what did you accomplish this week? want to reward some of you 🚀",
    date: "May 30, 2025",
    section: "earlier",
  },
  {
    id: 3,
    name: "eric",
    avatar: "/gold-logo.PNG",
    message: "@everyone WIN MONEY BY GETTING THE HIGHEST SCORE IN OUR NEW DINO GAME EACH DAY: https://metamansions.com/play-this-game-win-money-b6As5oEAlnD0qz/app/",
    date: "May 28, 2025",
    section: "earlier",
  },
  {
    id: 4,
    name: "Zap",
    avatar: "/gold-logo.PNG",
    message: "@everyone Drop What are you working on right now here! I need some new Meta Mansions to join 👀",
    date: "May 22, 2025",
    section: "earlier",
  },
  {
    id: 5,
    name: "eric",
    avatar: "/gold-logo.PNG",
    message: "what's @everyone working on right now?! trying to see who's grinding 👀👀👀",
    date: "May 20, 2025",
    section: "earlier",
  },
  {
    id: 6,
    name: "Zap",
    avatar: "/gold-logo.PNG",
    message: "@everyone What are ya'll working on this weekend, Share your Meta Mansions work and get eyes 👀",
    date: "May 16, 2025",
    section: "earlier",
  },
  {
    id: 7,
    name: "Zap",
    avatar: "/gold-logo.PNG",
    message: "@everyone Share what you are working on here on Meta Mansions, Connect with others and get more eyes on your projects 👀",
    date: "May 15, 2025",
    section: "earlier",
  },
  {
    id: 8,
    name: "Zap",
    avatar: "/gold-logo.PNG",
    message: "Are you guys Building a Meta Mansion? Or clipping? Share what your working on, connect with @everyone🚀",
    date: "May 12, 2025",
    section: "earlier",
  },
];

export default function NotificationsPage() {
  const [tab, setTab] = useState("Mentions");

  // Group notifications by section
  const latest = notifications.filter((n) => n.section === "latest");
  const earlier = notifications.filter((n) => n.section === "earlier");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (placeholder for now) */}
      <aside className="w-20 bg-black border-r border-[#232323] flex flex-col items-center py-4 gap-4">
        {/* Sidebar icons only, removed white circle */}
        <div className="flex flex-col gap-6 text-zinc-400 text-2xl mt-6">
          <span className="w-8 h-8 flex items-center justify-center"><i className="fa fa-plus" /></span>
          <span className="w-8 h-8 flex items-center justify-center"><i className="fa fa-home" /></span>
          <span className="w-8 h-8 flex items-center justify-center"><i className="fa fa-search" /></span>
          <span className="w-8 h-8 flex items-center justify-center"><i className="fa fa-comment" /></span>
          <span className="w-8 h-8 flex items-center justify-center"><i className="fa fa-bell" /></span>
          <span className="w-8 h-8 flex items-center justify-center"><i className="fa fa-user" /></span>
          <span className="w-8 h-8 flex items-center justify-center"><i className="fa fa-cog" /></span>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-0 py-8">
        <div className="w-full max-w-4xl rounded-xl border-l border-t border-b border-[#232323] shadow p-0">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-[#232323]">
            <h1 className="text-white text-2xl font-semibold">Notifications</h1>
            <button className="px-4 py-2 bg-[#232323] text-zinc-200 rounded border border-[#333] hover:bg-[#232323]/80 text-sm">Mark all as read</button>
          </div>
          {/* Tabs */}
          <div className="flex gap-2 px-8 pt-4">
            <button
              className={`px-4 py-1.5 rounded font-medium text-sm ${tab === "Mentions" ? "bg-[#232323] text-white border-b-2 border-white" : "bg-transparent text-zinc-400"}`}
              onClick={() => setTab("Mentions")}
            >
              Mentions
            </button>
            <button
              className={`px-4 py-1.5 rounded font-medium text-sm ${tab === "All activity" ? "bg-[#232323] text-white border-b-2 border-white" : "bg-transparent text-zinc-400"}`}
              onClick={() => setTab("All activity")}
            >
              All activity
            </button>
          </div>
          {/* Notification List */}
          <div className="divide-y divide-[#232323] mt-2">
            {/* Latest Section */}
            {latest.length > 0 && (
              <div>
                {latest.map((n) => (
                  <div key={n.id} className="flex items-center px-8 py-5 gap-4">
                    <img src={n.avatar} alt={n.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="text-white font-semibold text-base">{n.name}</div>
                      <div className="text-zinc-300 text-sm mt-0.5">{n.message}</div>
                    </div>
                    <div className="text-zinc-500 text-xs whitespace-nowrap">{n.date}</div>
                  </div>
                ))}
                <div className="flex items-center justify-center py-2 text-xs text-zinc-500 tracking-widest">EARLIER</div>
              </div>
            )}
            {/* Earlier Section */}
            {earlier.map((n) => (
              <div key={n.id} className="flex items-center px-8 py-5 gap-4">
                <img src={n.avatar} alt={n.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="text-white font-semibold text-base">{n.name}</div>
                  <div className="text-zinc-300 text-sm mt-0.5">{n.message}</div>
                </div>
                <div className="text-zinc-500 text-xs whitespace-nowrap">{n.date}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 