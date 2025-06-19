"use client";
import { useState, useRef, useEffect } from 'react';
import { FaDesktop, FaSun, FaMoon, FaGraduationCap, FaBlog, FaLightbulb, FaQuestionCircle, FaBriefcase, FaCode, FaFileContract } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function OnboardingBottomBar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sound, setSound] = useState(true);
  const [devMode, setDevMode] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [linksOpen, setLinksOpen] = useState(false);
  const [theme, setTheme] = useState('system');
  const [leaderboardHover, setLeaderboardHover] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const menuPopoverRef = useRef(null);
  const linksRef = useRef(null);
  const leaderboardRef = useRef(null);
  const chatModalRef = useRef(null);
  const helpModalRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e) {
      if (
        menuPopoverRef.current &&
        !menuPopoverRef.current.contains(e.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
        setLanguageOpen(false);
        setLinksOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  useEffect(() => {
    if (!chatOpen) return;
    function handleClick(e) {
      if (chatModalRef.current && !chatModalRef.current.contains(e.target)) {
        setChatOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [chatOpen]);

  useEffect(() => {
    if (!helpOpen) return;
    function handleClick(e) {
      if (helpModalRef.current && !helpModalRef.current.contains(e.target)) {
        setHelpOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [helpOpen]);

  const links = [
    { label: 'Keys University', icon: FaGraduationCap, href: '/auth/bottom-menus/university' },
    { label: 'Blog', icon: FaBlog, href: '/auth/bottom-menus/blogs' },
    { label: 'Use cases', icon: FaLightbulb, href: '/auth/bottom-menus/use-cases' },
    { label: 'Help', icon: FaQuestionCircle, href: '/auth/bottom-menus/help' },
    { label: 'Careers', icon: FaBriefcase, href: '/auth/bottom-menus/careers' },
    { label: 'Developers', icon: FaCode, href: '/auth/bottom-menus/developers' },
    { label: 'Terms', icon: FaFileContract, href: '/auth/bottom-menus/terms' },
  ];

  const handleLinkClick = (href) => {
    if (href.startsWith('/auth/bottom-menus/')) {
      router.push(href);
      setMenuOpen(false);
      setLinksOpen(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-zinc-800 flex items-center justify-between px-4 py-2 z-50">
      {/* Left section: Menu button with popover */}
      <div className="flex items-center gap-2 relative">
        <button
          ref={menuBtnRef}
          className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 text-gray-200 text-xs font-medium hover:bg-zinc-700 transition border border-zinc-700"
          onClick={() => setMenuOpen(v => !v)}
        >
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="2" width="22" height="1.5" rx="0.75" fill="#FFD700" />
            <rect x="0" y="11" width="14" height="1.5" rx="0.75" fill="#FFD700" />
          </svg>
          <span className="font-normal text-xs tracking-wide">Menu</span>
        </button>
        {menuOpen && (
          <div ref={menuPopoverRef} className="absolute bottom-10 left-0 w-64 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 p-3 z-50 animate-fade-in">
            {/* Theme Selector */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-200">Theme</span>
              <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-1">
                <button
                  onClick={() => setTheme('system')}
                  className={`p-1.5 rounded-md transition-colors ${
                    theme === 'system' ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-gray-200'
                  }`}
                  title="System"
                >
                  <FaDesktop className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTheme('light')}
                  className={`p-1.5 rounded-md transition-colors ${
                    theme === 'light' ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-gray-200'
                  }`}
                  title="Light"
                >
                  <FaSun className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-1.5 rounded-md transition-colors ${
                    theme === 'dark' ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-gray-200'
                  }`}
                  title="Dark"
                >
                  <FaMoon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            {/* Border line separator */}
            <div className="border-b border-zinc-800 mb-3" />
            {/* Sound Effects and Developer Mode Toggles */}
            <div className="flex flex-col gap-2 mb-3">
              {/* Sound Effects Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-xs text-gray-200">Sound effects</label>
                <button
                  onClick={() => setSound(v => !v)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                    sound ? 'bg-yellow-500' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      sound ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              {/* Developer Mode Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-xs text-gray-200">Developer mode</label>
                <button
                  onClick={() => setDevMode(v => !v)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                    devMode ? 'bg-yellow-500' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      devMode ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            {/* Border line separator */}
            <div className="border-b border-zinc-800 mb-3" />
            {/* Language submenu */}
            <div className="mb-2">
              <button
                className="flex items-center justify-between w-full text-xs text-gray-200 px-2 py-1 rounded hover:bg-zinc-800"
                onClick={() => setLanguageOpen(v => !v)}
              >
                <span>Language</span>
                <span className="ml-2">&gt;</span>
              </button>
              {languageOpen && (
                <div className="absolute left-64 top-0 w-40 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 p-2 z-50 animate-fade-in">
                  {['English','Deutsch','Español','Français','Português','中文','Italiano','Nederlands'].map(lang => (
                    <div key={lang} className="px-2 py-1 text-xs text-gray-200 hover:bg-zinc-800 rounded cursor-pointer">
                      {lang === 'English' && <span className="mr-2">✓</span>}
                      {lang}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Other menu items */}
            <div className="flex flex-col gap-1 mb-2">
              <button 
                className="flex items-center justify-between w-full text-xs text-gray-200 px-2 py-1 rounded hover:bg-zinc-800 text-left"
                onClick={() => setLinksOpen(v => !v)}
              >
                <span>Links</span>
                <span className="ml-2">&gt;</span>
              </button>
              {linksOpen && (
                <div ref={linksRef} className="absolute left-64 top-8 w-48 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 p-2 z-50 animate-fade-in">
                  {links.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => handleLinkClick(link.href)}
                      className="flex items-center gap-2 px-2 py-1.5 text-xs text-gray-200 hover:bg-zinc-800 rounded cursor-pointer w-full text-left"
                    >
                      <link.icon className="w-3.5 h-3.5 text-yellow-400" />
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
              <button className="text-xs text-gray-200 px-2 py-1 rounded hover:bg-zinc-800 text-left">Help & support</button>
              <button className="text-xs text-gray-200 px-2 py-1 rounded hover:bg-zinc-800 text-left">Submit feedback</button>
              <button className="text-xs text-gray-200 px-2 py-1 rounded hover:bg-zinc-800 text-left">Contact sales</button>
              <button className="text-xs text-gray-200 px-2 py-1 rounded hover:bg-zinc-800 text-left">Become a partner</button>
              <button className="text-xs text-gray-400 px-2 py-1 rounded cursor-default text-left">What's New <span className="text-[10px] ml-1">05/22</span></button>
            </div>
          </div>
        )}
        <span className="ml-2 px-2 py-1 bg-zinc-800 rounded text-xs text-green-400 font-semibold">$0.00</span>
        <span
          ref={leaderboardRef}
          className="ml-2 px-2 py-1 bg-zinc-800 rounded text-xs text-yellow-400 font-semibold relative cursor-pointer"
          onMouseEnter={() => setLeaderboardHover(true)}
          onMouseLeave={() => setLeaderboardHover(false)}
          onClick={() => router.push('/leaderboard')}
        >
          Not ranked
          {leaderboardHover && (
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-8 mb-1 z-50 min-w-[220px] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl p-3 animate-fade-in"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.35)', pointerEvents: 'none' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-yellow-900/30 rounded p-0.5">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="16" height="16" rx="4" fill="#FFD700"/>
                    <rect x="6" y="6" width="8" height="8" rx="2" fill="#fff"/>
                  </svg>
                </span>
                <span className="text-xs font-semibold text-white">Leaderboard</span>
                <span className="ml-auto px-2 py-0.5 bg-yellow-900/30 rounded text-[10px] text-yellow-400 font-semibold">Not ranked</span>
              </div>
              <div className="border-b border-zinc-800 mb-2" />
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-gray-400">24h earned</span>
                <span className="text-[11px] text-white font-mono">$0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-400">Lifetime</span>
                <span className="text-[11px] text-white font-mono">$0.00</span>
              </div>
            </div>
          )}
        </span>
      </div>
      {/* Right section */}
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 rounded bg-zinc-800 text-white text-xs font-medium hover:bg-zinc-700 transition relative"
          onClick={() => setChatOpen(true)}
        >
          Chat
        </button>
        <button 
          className="px-3 py-1 rounded bg-zinc-800 text-white text-xs font-medium hover:bg-zinc-700 transition relative"
          onClick={() => setHelpOpen(true)}
        >
          Need help?
        </button>
        {chatOpen && (
          <div
            ref={chatModalRef}
            className="absolute bottom-full right-0 mb-2 z-50 w-[370px] max-w-[95vw] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl animate-fade-in"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
              <span className="font-semibold text-white text-base">Messages</span>
              <button
                className="text-zinc-400 hover:text-white text-lg font-bold px-2 py-1 rounded"
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
            {/* Tabs */}
            <div className="flex gap-2 px-4 pt-3 pb-2">
              <button className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-white">Unread</button>
              <button className="px-3 py-1 rounded-full text-xs font-semibold text-zinc-400 hover:bg-zinc-800">Groups</button>
              <button className="px-3 py-1 rounded-full text-xs font-semibold text-zinc-400 hover:bg-zinc-800">Requests</button>
            </div>
            {/* Message List */}
            <div className="px-4 py-3 max-h-[400px] overflow-y-auto">
              <div className="flex items-center gap-3 py-3 cursor-pointer hover:bg-zinc-800 rounded-lg px-3">
                <span className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-lg font-bold text-white">T</span>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm flex items-center gap-1">Team Meta Mansions <span className="text-xs">✔️</span></div>
                  <div className="text-xs text-zinc-400 truncate max-w-[180px]">Team Meta Mansions: Welcome to Meta Mansions! ...</div>
                </div>
                <span className="text-xs text-zinc-400">Thu</span>
              </div>
              {/* Add more messages as needed */}
              <div className="flex items-center gap-3 py-3 cursor-pointer hover:bg-zinc-800 rounded-lg px-3">
                <span className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-lg font-bold text-white">S</span>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm flex items-center gap-1">Support Team <span className="text-xs">✔️</span></div>
                  <div className="text-xs text-zinc-400 truncate max-w-[180px]">How can we help you today?</div>
                </div>
                <span className="text-xs text-zinc-400">Wed</span>
              </div>
              <div className="flex items-center gap-3 py-3 cursor-pointer hover:bg-zinc-800 rounded-lg px-3">
                <span className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-lg font-bold text-white">A</span>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm flex items-center gap-1">Announcements <span className="text-xs">✔️</span></div>
                  <div className="text-xs text-zinc-400 truncate max-w-[180px]">New features coming soon!</div>
                </div>
                <span className="text-xs text-zinc-400">Tue</span>
              </div>
            </div>
            {/* Search and Footer */}
            <div className="border-t border-zinc-800 px-4 py-4 bg-zinc-900 rounded-b-2xl flex items-center gap-2">
              <input
                className="flex-1 bg-zinc-800 rounded-full px-4 py-2.5 text-sm text-gray-200 outline-none"
                placeholder="Search messages..."
              />
              <button className="px-4 py-2 rounded bg-zinc-800 text-white text-sm font-medium hover:bg-zinc-700 transition">Chat</button>
            </div>
          </div>
        )}
        {helpOpen && (
          <div
            ref={helpModalRef}
            className="absolute bottom-full right-0 mb-2 z-50 w-[370px] max-w-[95vw] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl animate-fade-in"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
              <span className="font-semibold text-white text-base">Help Center</span>
              <button
                className="text-zinc-400 hover:text-white text-lg font-bold px-2 py-1 rounded"
                onClick={() => setHelpOpen(false)}
                aria-label="Close help"
              >
                ×
              </button>
            </div>
            {/* Quick Actions */}
            <div className="px-4 py-3">
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center gap-2 p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition">
                  <FaQuestionCircle className="w-6 h-6 text-yellow-400" />
                  <span className="text-sm text-white font-medium">FAQ</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition">
                  <FaGraduationCap className="w-6 h-6 text-yellow-400" />
                  <span className="text-sm text-white font-medium">Tutorials</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition">
                  <FaBlog className="w-6 h-6 text-yellow-400" />
                  <span className="text-sm text-white font-medium">Blog</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition">
                  <FaFileContract className="w-6 h-6 text-yellow-400" />
                  <span className="text-sm text-white font-medium">Terms</span>
                </button>
              </div>
            </div>
            {/* Popular Topics */}
            <div className="px-4 py-3 border-t border-zinc-800">
              <h3 className="text-sm font-semibold text-white mb-3">Popular Topics</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition">
                  How to get started
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition">
                  Account settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition">
                  Billing & payments
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition">
                  Security & privacy
                </button>
              </div>
            </div>
            {/* Contact Support */}
            <div className="border-t border-zinc-800 px-4 py-4 bg-zinc-900 rounded-b-2xl">
              <button className="w-full px-4 py-2.5 rounded bg-yellow-500 text-black text-sm font-medium hover:bg-yellow-400 transition flex items-center justify-center gap-2">
                <FaQuestionCircle className="w-4 h-4" />
                Contact Support
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 