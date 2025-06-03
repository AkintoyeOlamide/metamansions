"use client";
import { FaRocket, FaUsers, FaWallet, FaCog, FaFolderOpen, FaMoneyBillWave } from 'react-icons/fa';

const helpCategories = [
  {
    icon: <FaRocket className="w-7 h-7" />,
    title: 'Creators',
    articles: 64,
  },
  {
    icon: <FaUsers className="w-7 h-7" />,
    title: 'Affiliates',
    articles: 5,
  },
  {
    icon: <FaMoneyBillWave className="w-7 h-7" />,
    title: 'Billing & Subscriptions',
    articles: 22,
  },
  {
    icon: <FaCog className="w-7 h-7" />,
    title: 'Account settings',
    articles: 16,
  },
  {
    icon: <FaFolderOpen className="w-7 h-7" />,
    title: 'Content Rewards',
    articles: 6,
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#181818] via-[#232323] to-white relative overflow-x-hidden text-white">
      {/* Faded Meta Mansions Logo Background */}
      <img 
        src="/gold-logo.PNG" 
        alt="Meta Mansions Logo" 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[80vw] opacity-40 pointer-events-none z-0 select-none"
        style={{ filter: 'blur(0.1px)' }}
      />
      {/* Star/Cloud BG Placeholder */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{background: 'radial-gradient(circle at 50% 0%, #232323 0%, #232323 60%, #fff 100%)'}} />
      {/* Logo and nav */}
      <div className="flex justify-between items-center px-10 pt-6 z-10 relative">
        <div className="flex items-center gap-2">
          <span className="bg-yellow-400 rounded p-1"><FaRocket className="w-7 h-7 text-black" /></span>
          <span className="font-extrabold text-2xl text-white tracking-tight">Keys</span>
        </div>
        <div className="flex gap-8 font-medium text-base">
          <span className="hover:underline cursor-pointer">Home</span>
          <span className="hover:underline cursor-pointer">Memberships</span>
          <span className="hover:underline cursor-pointer">Dashboard</span>
          <span className="hover:underline cursor-pointer">English</span>
        </div>
      </div>
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center pt-10 pb-20 z-10 relative">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 mt-8">How can we help?</h1>
        {/* Search Bar */}
        <div className="w-full max-w-xl mb-10 flex items-center bg-white/80 rounded-xl shadow px-4 py-3 border border-gray-200">
          <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input className="flex-1 bg-transparent outline-none text-lg text-black placeholder-gray-400" placeholder="Search for articles..." />
        </div>
        {/* Help Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-16">
          {helpCategories.map(cat => (
            <div key={cat.title} className="flex items-center gap-4 bg-white rounded-xl shadow p-6 border border-gray-200 hover:shadow-lg transition cursor-pointer">
              <div className="bg-orange-500 rounded-lg p-3 text-white flex items-center justify-center">
                {cat.icon}
              </div>
              <div>
                <div className="font-bold text-lg text-black mb-1">{cat.title}</div>
                <div className="text-gray-500 text-sm">{cat.articles} articles</div>
              </div>
            </div>
          ))}
        </div>
        {/* Chat Section */}
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-2xl font-bold mb-2">Need to talk with a person?</h2>
          <p className="text-white/80 mb-4">Our average response time is 30 seconds.</p>
          <button className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-3 rounded-full text-lg transition">Chat with us</button>
        </div>
      </main>
    </div>
  );
} 