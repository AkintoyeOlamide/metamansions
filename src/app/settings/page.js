"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="min-h-screen bg-black p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-yellow-400 mb-2">Settings</h1>
        <p className="text-gray-400 text-sm">Manage your account and preferences</p>
      </div>

      {/* Settings Container */}
      <div className="max-w-6xl mx-auto bg-[#18191c] border border-yellow-500 rounded-lg shadow-xl">
        {/* Tabs */}
        <div className="border-b border-yellow-500">
          <div className="flex">
            <button
              className={`px-6 py-3 text-sm font-semibold focus:outline-none transition-colors ${
                activeTab === 'account' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('account')}
            >
              Account
            </button>
            <button
              className={`px-6 py-3 text-sm font-semibold focus:outline-none transition-colors ${
                activeTab === 'profile' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`px-6 py-3 text-sm font-semibold focus:outline-none transition-colors ${
                activeTab === 'security' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
            <button
              className={`px-6 py-3 text-sm font-semibold focus:outline-none transition-colors ${
                activeTab === 'notifications' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gray-700 relative overflow-hidden">
                  <Image
                    src="/profile-placeholder.png"
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div>
                  <h3 className="text-yellow-400 font-semibold mb-1">Profile Picture</h3>
                  <button className="text-sm text-yellow-400 hover:text-yellow-500 underline">
                    Change Photo
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-yellow-400 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 bg-black border border-yellow-500 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-yellow-400 text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-black border border-yellow-500 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-yellow-400 text-sm font-medium mb-2">
                    Bio
                  </label>
                  <textarea
                    className="w-full px-3 py-2 bg-black border border-yellow-500 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 h-24"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <div className="pt-4">
                <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg text-sm transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="text-gray-300">
              <h3 className="text-yellow-400 font-semibold mb-4">Profile Settings</h3>
              {/* Add profile settings content */}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="text-gray-300">
              <h3 className="text-yellow-400 font-semibold mb-4">Security Settings</h3>
              {/* Add security settings content */}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="text-gray-300">
              <h3 className="text-yellow-400 font-semibold mb-4">Notification Preferences</h3>
              {/* Add notification settings content */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 