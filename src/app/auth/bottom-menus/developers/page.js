"use client";
import { FaChevronDown, FaSearch, FaSun, FaMoon } from 'react-icons/fa';

const sidebarSections = [
  {
    title: 'Getting Started',
    items: ['Introduction', 'Getting started', 'Tutorials', 'Get an API key'],
  },
  {
    title: 'Tutorials',
    items: ['AI image generator', 'Chat bot'],
  },
  {
    title: 'Features',
    items: [
      'Webhooks',
      'Login with Keys',
      'Embed checkout (coming soon)',
      'Connect to websocket',
      'Payments and payouts',
      'Send push notification',
      'Create forum post',
      'Upload media',
    ],
  },
];

const rightNav = [
  'What are Keys Apps?',
  'Examples of apps',
  'Why build Keys apps?',
  'Distribution',
  'Authentication',
  'Payments',
  'Transaction fees',
  'Installation fee',
  'Per seat',
  'Monthly subscription',
  'Affiliate commission',
  'How to get started',
];

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-[#18111c] text-white flex flex-col">
      {/* Top Nav */}
      <div className="w-full flex items-center justify-between px-8 py-4 border-b border-[#2a1f36] bg-[#18111c]">
        <div className="flex items-center gap-4">
          <span className="bg-yellow-400 rounded p-1 mr-2">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#FFD700"/><path d="M10 18L18 10L26 18L18 26L10 18Z" fill="#18111c"/></svg>
          </span>
          <span className="font-extrabold text-2xl text-white tracking-tight">Keys</span>
          <button className="ml-6 flex items-center gap-2 bg-[#23202b] px-3 py-1.5 rounded text-sm font-semibold text-white border border-[#2a1f36]">
            GraphQL API <FaChevronDown className="ml-1 text-xs" />
          </button>
        </div>
        <div className="flex items-center gap-4 flex-1 max-w-xl mx-8">
          <div className="flex items-center bg-[#23202b] rounded px-3 py-2 w-full">
            <FaSearch className="text-gray-400 mr-2" />
            <input className="bg-transparent outline-none text-white w-full" placeholder="Search..." />
          </div>
          <button className="ml-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-full text-base transition">Start Building</button>
          <button className="ml-2 p-2 rounded hover:bg-[#23202b] transition">
            <FaSun className="w-5 h-5 text-yellow-400" />
          </button>
        </div>
      </div>
      {/* Main Layout */}
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto">
        {/* Sidebar */}
        <aside className="w-64 min-w-[220px] border-r border-[#2a1f36] bg-[#18111c] py-8 px-6 flex flex-col gap-6">
          <nav className="flex flex-col gap-6">
            {sidebarSections.map(section => (
              <div key={section.title}>
                <div className="text-xs font-bold uppercase text-white/60 mb-2">{section.title}</div>
                <div className="flex flex-col gap-1">
                  {section.items.map(item => (
                    <button key={item} className={`text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#23202b] transition ${item === 'Introduction' ? 'bg-[#2a1f36] text-orange-400' : 'text-white/80'}`}>{item}</button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 px-16 py-12">
          <div className="mb-8">
            <div className="text-orange-400 font-semibold mb-2">Getting Started</div>
            <h1 className="text-4xl font-extrabold mb-4">Introduction</h1>
            <p className="text-lg text-white/80 mb-8">Build Keys apps and sell them into Keys communities with thousands of members.</p>
            <h2 className="text-2xl font-bold mb-2">What are Keys Apps?</h2>
            <p className="mb-6 text-white/80">A Keys app is a web app that can be embedded into a Keys community. These apps can be installed by any Keys creator through our app store. As the developer, you can charge for the app using several options offered by our Keys SDK. Our SDK makes it easy to leverage the infrastructure of Keys, to build full-blown apps in hours, not weeks.</p>
            <h2 className="text-2xl font-bold mb-2">Examples of apps</h2>
            <ul className="list-disc ml-8 mb-6">
              <li><a href="#" className="underline text-orange-400">AI image generator</a></li>
              <li><a href="#" className="underline text-orange-400">Pay-to-play game</a></li>
            </ul>
            <h2 className="text-2xl font-bold mb-2">Why build Keys apps?</h2>
            <h3 className="text-xl font-semibold mb-1 mt-6">Distribution</h3>
            <p className="mb-6 text-white/80">You will be placed in the Keys App Store. The app store is visited by thousands of creators and users every day, giving your app instant exposure.</p>
          </div>
        </main>
        {/* Right Sidebar */}
        <aside className="w-64 min-w-[200px] border-l border-[#2a1f36] bg-[#18111c] py-8 px-6 flex flex-col gap-4">
          <div className="text-xs font-bold uppercase text-white/60 mb-2">On this page</div>
          <nav className="flex flex-col gap-2">
            {rightNav.map(item => (
              <a key={item} href="#" className={`text-sm hover:text-orange-400 transition ${item === 'What are Keys Apps?' ? 'text-orange-400 font-semibold' : 'text-white/80'}`}>{item}</a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
} 