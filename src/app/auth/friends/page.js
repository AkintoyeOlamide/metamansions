"use client";
import Image from "next/image";
import { useState } from "react";

const communities = [
  {
    name: "Keycard Community",
    desc: "Exclusive community for keycard holders",
    image: "/WhatsApp Image 2025-03-14 at 13.58.13.jpeg",
    members: 89,
    eth: "8,234 ETH"
  },
  {
    name: "OG Community",
    desc: "Original members of Meta Mansion",
    image: "/WhatsApp Image 2025-03-14 at 13.58.12.jpeg",
    members: 156,
    eth: "12,456 ETH"
  },
  {
    name: "Elite Mansion Owners",
    desc: "Private community for luxury mansion owners",
    image: "/WhatsApp Image 2025-03-14 at 13.58.12 (1).jpeg",
    members: 156,
    eth: "12,456 ETH"
  },
  {
    name: "Meta Architects",
    desc: "Design and build amazing virtual properties",
    image: "/WhatsApp Image 2025-03-14 at 13.58.12 (2).jpeg",
    members: 89,
    eth: "8,234 ETH"
  },
  {
    name: "Property Investors",
    desc: "Strategic investment discussions and opportunities",
    image: "/WhatsApp Image 2025-03-14 at 13.58.12 (3).jpeg",
    members: 234,
    eth: "15,789 ETH"
  }
];

const friends = [
  { name: "Alice", avatar: "/avatars/avatar1.png", status: "Online" },
  { name: "Bob", avatar: "/avatars/avatar2.png", status: "Offline" },
  { name: "Charlie", avatar: "/avatars/avatar3.png", status: "Online" },
  { name: "Diana", avatar: "/avatars/avatar4.png", status: "Offline" },
];

const activities = [
  { user: "Alice", action: "joined Keycard Community", time: "2 hours ago" },
  { user: "Bob", action: "became friends with Charlie", time: "4 hours ago" },
  { user: "Charlie", action: "created a new community: Mansion Tycoons", time: "1 day ago" },
  { user: "Diana", action: "left Property Investors", time: "2 days ago" },
];

export default function FriendsPage() {
  const [tab, setTab] = useState("COMMUNITIES");
  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Community</h1>
            <p className="text-gray-300">Connect with friends and join communities</p>
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg text-base shadow-lg transition-colors mt-4 md:mt-0">CREATE COMMUNITY</button>
        </div>
        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-700 mb-8">
          <button onClick={() => setTab("COMMUNITIES")} className={`pb-2 text-base font-bold uppercase tracking-wide focus:outline-none ${tab === "COMMUNITIES" ? "text-white border-b-2 border-white" : "text-gray-400 hover:text-white"}`}>COMMUNITIES</button>
          <button onClick={() => setTab("FRIENDS")} className={`pb-2 text-base font-bold uppercase tracking-wide focus:outline-none ${tab === "FRIENDS" ? "text-white border-b-2 border-white" : "text-gray-400 hover:text-white"}`}>FRIENDS</button>
          <button onClick={() => setTab("ACTIVITY")} className={`pb-2 text-base font-bold uppercase tracking-wide focus:outline-none ${tab === "ACTIVITY" ? "text-white border-b-2 border-white" : "text-gray-400 hover:text-white"}`}>ACTIVITY</button>
        </div>
        {/* Tab Content */}
        {tab === "COMMUNITIES" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map((com, idx) => (
              <div key={com.name} className={`rounded-2xl overflow-hidden bg-[#18191c] border border-gray-700 shadow-lg flex flex-col ${idx === 3 ? 'border-yellow-400' : ''}`}>
                <div className="relative w-full h-48">
                  <Image src={com.image} alt={com.name} fill className="object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-white text-lg mb-1">{com.name}</div>
                    <div className="text-gray-400 text-sm mb-4">{com.desc}</div>
                  </div>
                  <div className="flex items-center gap-6 text-gray-300 text-xs mt-auto">
                    <span className="flex items-center gap-1"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m9-7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/></svg> {com.members} members</span>
                    <span>{com.eth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "FRIENDS" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {friends.map(friend => (
              <div key={friend.name} className="bg-[#18191c] border border-yellow-600 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
                <Image src={friend.avatar} alt={friend.name} width={56} height={56} className="rounded-full border-2 border-yellow-400" />
                <div>
                  <div className="font-bold text-white text-lg mb-1">{friend.name}</div>
                  <div className={`text-xs font-semibold ${friend.status === 'Online' ? 'text-green-400' : 'text-gray-400'}`}>{friend.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "ACTIVITY" && (
          <div className="flex flex-col gap-4">
            {activities.map((act, idx) => (
              <div key={idx} className="bg-[#18191c] border border-yellow-600 rounded-2xl p-5 flex items-center gap-4 shadow-lg">
                <span className="text-yellow-400 font-bold">{act.user}</span>
                <span className="text-gray-300">{act.action}</span>
                <span className="ml-auto text-xs text-gray-400">{act.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 