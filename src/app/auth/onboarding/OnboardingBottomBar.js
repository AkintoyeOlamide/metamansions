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
  const menuBtnRef = useRef(null);
  const menuPopoverRef = useRef(null);
  const linksRef = useRef(null);

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
        <span className="ml-2 px-2 py-1 bg-zinc-800 rounded text-xs text-yellow-400 font-semibold">Not ranked</span>
      </div>
      {/* Right section */}
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 rounded bg-zinc-800 text-white text-xs font-medium hover:bg-zinc-700 transition">Chat</button>
        <button className="px-3 py-1 rounded bg-zinc-800 text-white text-xs font-medium hover:bg-zinc-700 transition">Need help?</button>
      </div>
    </div>
  );
} 