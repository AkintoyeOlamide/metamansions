"use client";
import { FaGraduationCap, FaChevronLeft, FaUserCircle, FaUsers, FaEllipsisH, FaHome, FaComments, FaTrophy, FaBookOpen, FaSmile, FaPaperclip, FaGift, FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import OnboardingBottomBar from '../../onboarding/OnboardingBottomBar';

export default function UniversityPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 rounded hover:bg-zinc-800 transition">
            <FaChevronLeft className="w-5 h-5 text-gray-200" />
          </button>
          <div className="flex items-center gap-2">
            <FaGraduationCap className="w-7 h-7 text-yellow-400" />
            <span className="font-bold text-lg">Keys University</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
            42 online
          </span>
        </div>
        <div className="flex items-center gap-3">
          <FaUserCircle className="w-6 h-6 text-gray-400" />
          <FaUsers className="w-6 h-6 text-gray-400" />
          <FaEllipsisH className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-[420px] min-w-[320px] max-w-[480px] border-r border-zinc-800 flex flex-col bg-zinc-900">
          {/* Banner/Logo */}
          <div className="flex items-center justify-center py-6 border-b border-zinc-800 bg-zinc-900">
            <div className="bg-white rounded-xl p-4 flex items-center justify-center">
              <FaGraduationCap className="w-24 h-24 text-yellow-400" />
            </div>
          </div>
          {/* Tabs */}
          <div className="flex items-center gap-6 px-6 py-3 border-b border-zinc-800 bg-zinc-900">
            <button className="flex flex-col items-center text-xs text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1">Home</button>
            <button className="flex flex-col items-center text-xs text-gray-300 hover:text-yellow-400 transition">Chat</button>
            <button className="flex flex-col items-center text-xs text-gray-300 hover:text-yellow-400 transition">Earn</button>
            <button className="flex flex-col items-center text-xs text-gray-300 hover:text-yellow-400 transition">Learn</button>
          </div>
          {/* Chat Input */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex-1 px-6 py-4 overflow-y-auto">
              {/* Announcements Dropdown */}
              <div className="mb-3">
                <button className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded text-xs text-gray-200 w-full justify-between">
                  Announcements <FaChevronDown className="w-3 h-3" />
                </button>
              </div>
              {/* Tag Buttons */}
              <div className="flex gap-2 mb-3">
                <button className="bg-zinc-800 text-xs text-gray-200 px-3 py-1 rounded-full">Genius Bar</button>
                <button className="bg-zinc-800 text-xs text-gray-200 px-3 py-1 rounded-full">Announcements</button>
              </div>
              {/* Chat Feed */}
              <div className="space-y-4">
                {/* Example chat post */}
                <div className="bg-zinc-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <FaUserCircle className="w-6 h-6 text-gray-400" />
                    <span className="font-semibold text-sm">Genius (Marc)</span>
                    <span className="text-xs text-gray-400 ml-2">@smartergenius · 12h</span>
                  </div>
                  <div className="text-gray-200 text-sm mb-2">Welcome to Keys University! 🚀</div>
                  <img src="/placeholder.png" alt="post" className="rounded-lg w-full max-h-40 object-cover bg-zinc-700" />
                </div>
              </div>
            </div>
            {/* Chat Input Bar */}
            <div className="border-t border-zinc-800 px-6 py-3 bg-zinc-900">
              <div className="flex items-center gap-2">
                <FaSmile className="w-5 h-5 text-gray-400 cursor-pointer" />
                <input className="flex-1 bg-zinc-800 rounded-full px-4 py-2 text-sm text-gray-200 outline-none" placeholder="Write something..." />
                <FaGift className="w-5 h-5 text-gray-400 cursor-pointer" />
                <FaPaperclip className="w-5 h-5 text-gray-400 cursor-pointer" />
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold ml-2">Post</button>
              </div>
            </div>
          </div>
        </div>
        {/* Right Panel */}
        <div className="flex-1 flex flex-col items-center justify-center bg-zinc-900">
          <div className="flex flex-col items-center">
            <div className="bg-zinc-800 rounded-2xl p-8 mb-4 flex items-center justify-center">
              <FaGraduationCap className="w-24 h-24 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Keys University</h2>
            <p className="text-gray-400">Select a post or app to open it here</p>
          </div>
        </div>
      </div>
      <OnboardingBottomBar />
    </div>
  );
} 