"use client";
import Image from "next/image";
import Link from "next/link";
import { GiCompass, GiHouse, GiEntryDoor, GiHelp, GiEarthAmerica, GiTrade } from "react-icons/gi";
import { BsSunFill } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import { RiMenu3Line } from 'react-icons/ri';
import { FiCompass, FiUser } from "react-icons/fi";

export default function Sidebar() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const helpRef = useRef();
  const themeRef = useRef();
  const languageRef = useRef();

  // Close modals when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setHelpOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setThemeOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false);
      }
    }
    if (helpOpen || themeOpen || languageOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [helpOpen, themeOpen, languageOpen]);

  // Example theme toggle function (replace with your actual theme logic)
  const toggleTheme = () => {
    // Toggle theme logic here (e.g., using a context or local state)
    console.log("Theme toggled");
  };

  // Example language change function (replace with your actual language logic)
  const changeLanguage = (lang) => {
    // Language change logic here (e.g., using a context or local state)
    console.log("Language changed to:", lang);
  };

  return (
    <>
      {/* Hamburger Menu Button - Only visible on mobile */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black rounded-lg"
        aria-label="Toggle Menu"
      >
        <RiMenu3Line className="text-2xl text-yellow-400" />
      </button>

      {/* Your existing sidebar with added mobile responsiveness */}
      <aside className={`
        fixed top-0 left-0 h-full w-16 bg-black border-r border-yellow-500 
        flex flex-col items-center py-4 z-40
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="pt-4">
          <Link href="/" className="block hover:opacity-80 transition-opacity">
          <Image src="/gold-logo.PNG" alt="Gold Logo" width={40} height={40} />
          </Link>
        </div>
        {/* Spacer above main icons */}
        <div className="flex-1" />
        {/* Main Navigation - Centered */}
        <div className="flex flex-col items-center gap-6">
          <Link 
            href="/"
            className="hover:scale-110 transition-all cursor-pointer group relative flex items-center"
          >
            <FiCompass className="text-2xl text-white hover:text-gray-300 transition-colors" />
            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-50 px-4 py-2 min-w-[100px] rounded-lg bg-[rgba(23,23,23,0.95)] border border-white/10 text-yellow-400 text-sm font-medium opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 shadow-lg backdrop-blur-md">
              Discover
            </div>
          </Link>
          <Link 
            href="/discover"
            className="hover:scale-110 transition-all cursor-pointer group relative flex items-center"
          >
            <GiHouse className="text-xl text-white hover:text-gray-300 transition-colors" />
            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-50 px-4 py-2 min-w-[100px] rounded-lg bg-[rgba(23,23,23,0.95)] border border-white/10 text-yellow-400 text-sm font-medium opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 shadow-lg backdrop-blur-md">
              Build
            </div>
          </Link>
          <Link 
            href="/signin"
            className="hover:scale-110 transition-all cursor-pointer group relative flex items-center"
          >
            <FiUser className="text-2xl text-white hover:text-gray-300 transition-colors" />
            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-50 px-4 py-2 min-w-[100px] rounded-lg bg-[rgba(23,23,23,0.95)] border border-white/10 text-yellow-400 text-sm font-medium opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 shadow-lg backdrop-blur-md">
              Sign In
            </div>
          </Link>
        </div>
        {/* Spacer below main icons to center them */}
        <div className="flex-1" />
        {/* Bottom Utility Icons */}
        <div className="flex flex-col items-center gap-2 mb-20 relative">
          {/* Help Icon with Modal */}
          <div className="relative">
            <button
              className="hover:scale-110 transition-all cursor-pointer group relative flex items-center"
              onClick={() => setHelpOpen((v) => !v)}
              aria-label="Help"
            >
              <GiHelp className="text-xl text-white hover:text-gray-300 transition-colors" />
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-50 px-4 py-2 min-w-[100px] rounded-lg bg-[rgba(23,23,23,0.95)] border border-white/10 text-yellow-400 text-sm font-medium opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 shadow-lg backdrop-blur-md">
                Help
              </div>
            </button>
            {helpOpen && (
              <div
                ref={helpRef}
                className="absolute left-16 top-1/2 -translate-y-1/2 z-50 bg-black border border-yellow-500 rounded-lg shadow-xl p-3 min-w-[160px] space-y-1"
              >
                <div className="font-bold text-yellow-400 mb-1 text-xs">Help & Resources</div>
                <ul className="space-y-0.5">
                  <li>
                    <Link href="/mm-university" className="hover:text-yellow-400 transition-colors block text-xs">MM University</Link>
                  </li>
                  <li>
                    <Link href="/use-cases" className="hover:text-yellow-400 transition-colors block text-xs">Use Cases</Link>
                  </li>
                  <li>
                    <Link href="/career" className="hover:text-yellow-400 transition-colors block text-xs">Career</Link>
                  </li>
                  <li>
                    <Link href="/roadmap" className="hover:text-yellow-400 transition-colors block text-xs">Roadmap</Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-yellow-400 transition-colors block text-xs">Blog</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Theme Icon with Modal */}
          <div className="relative">
            <button
              className="hover:scale-110 transition-all cursor-pointer group relative flex items-center"
              onClick={() => setThemeOpen((v) => !v)}
              aria-label="Theme"
            >
              <BsSunFill className="text-xl text-white hover:text-gray-300 transition-colors" />
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-50 px-4 py-2 min-w-[100px] rounded-lg bg-[rgba(23,23,23,0.95)] border border-white/10 text-yellow-400 text-sm font-medium opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 shadow-lg backdrop-blur-md">
                Theme
              </div>
            </button>
            {themeOpen && (
              <div
                ref={themeRef}
                className="absolute left-16 top-1/2 -translate-y-1/2 z-50 bg-black border border-yellow-500 rounded-lg shadow-xl p-3 min-w-[160px] space-y-1"
              >
                <div className="font-bold text-yellow-400 mb-1 text-xs">Choose Theme</div>
                <ul className="space-y-0.5">
                  <li>
                    <button onClick={toggleTheme} className="hover:text-yellow-400 transition-colors block w-full text-left text-xs">Light Mode</button>
                  </li>
                  <li>
                    <button onClick={toggleTheme} className="hover:text-yellow-400 transition-colors block w-full text-left text-xs">Dark Mode</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Language Icon with Modal */}
          <div className="relative">
            <button
              className="hover:scale-110 transition-all cursor-pointer group relative flex items-center"
              onClick={() => setLanguageOpen((v) => !v)}
              aria-label="Language"
            >
              <GiEarthAmerica className="text-xl text-white hover:text-gray-300 transition-colors" />
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-50 px-4 py-2 min-w-[100px] rounded-lg bg-[rgba(23,23,23,0.95)] border border-white/10 text-yellow-400 text-sm font-medium opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 shadow-lg backdrop-blur-md">
                Language
              </div>
            </button>
            {languageOpen && (
              <div
                ref={languageRef}
                className="absolute left-16 top-1/2 -translate-y-1/2 z-50 bg-black border border-yellow-500 rounded-lg shadow-xl p-3 min-w-[160px] space-y-1"
              >
                <div className="font-bold text-yellow-400 mb-1 text-xs">Choose Language</div>
                <ul className="space-y-0.5">
                  <li>
                    <button onClick={() => changeLanguage("English")} className="hover:text-yellow-400 transition-colors block w-full text-left text-xs">English</button>
                  </li>
                  <li>
                    <button onClick={() => changeLanguage("Deutsch")} className="hover:text-yellow-400 transition-colors block w-full text-left text-xs">Deutsch</button>
                  </li>
                  <li>
                    <button onClick={() => changeLanguage("Espanol")} className="hover:text-yellow-400 transition-colors block w-full text-left text-xs">Espanol</button>
                  </li>
                  <li>
                    <button onClick={() => changeLanguage("Francais")} className="hover:text-yellow-400 transition-colors block w-full text-left text-xs">Francais</button>
                  </li>
                  <li>
                    <button onClick={() => changeLanguage("Portugues")} className="hover:text-yellow-400 transition-colors block w-full text-left text-xs">Portugues</button>
                  </li>
                  <li>
                    <button onClick={() => changeLanguage("Chinese")} className="hover:text-yellow-400 transition-colors block w-full text-left text-xs">Chinese</button>
                  </li>
                  <li>
                    <button onClick={() => changeLanguage("Italiano")} className="hover:text-yellow-400 transition-colors block w-full text-left text-xs">Italiano</button>
                  </li>
                  <li>
                    <button onClick={() => changeLanguage("Nederlands")} className="hover:text-yellow-400 transition-colors block w-full text-left text-xs">Nederlands</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Optional: Overlay for mobile when menu is open */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
} 