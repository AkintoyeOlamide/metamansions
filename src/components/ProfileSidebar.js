import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

export default function ProfileSidebar({
  profilePic,
  sidebarName,
  sidebarUsername,
  sections = [],
  loading = false,
  onLogout
}) {
  return (
    <aside className="w-80 border-r border-zinc-800 flex flex-col justify-between bg-transparent">
      <div>
        <div className="flex flex-col items-center pt-8 pb-4 w-full">
          <div className="text-white text-lg font-bold mb-6">Account settings</div>
          {loading ? (
            <div className="w-20 h-20 rounded-full bg-zinc-800 animate-pulse mb-2" />
          ) : profilePic ? (
            <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-yellow-400 mb-2" />
          ) : (
            <img src="/profile-placeholder.png" alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-zinc-700 mb-2" />
          )}
          {!loading && (
            <>
              <div className="text-white text-base font-semibold">{sidebarName}</div>
              <div className="text-zinc-400 text-sm mb-4">@{sidebarUsername}</div>
            </>
          )}
          <div className="w-full border-b border-zinc-800"></div>
        </div>
        <nav className="flex-1">
          <ul className="space-y-1 px-6">
            {sections.map((section) => (
              <li key={section.label}>
                <button className="flex items-center w-full text-zinc-300 hover:bg-zinc-800 px-3 py-2 rounded transition">
                  <span className="mr-3 text-lg">{section.icon}</span>
                  <span className="text-sm">{section.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button
        className="flex items-center justify-center w-full text-red-400 py-4 border-t border-zinc-800 text-base font-semibold hover:bg-zinc-900 transition"
        onClick={onLogout}
      >
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </aside>
  );
} 