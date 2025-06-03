"use client";
import { FaHome, FaEnvelope, FaTag, FaUserTie, FaMusic, FaFilm, FaPodcast, FaStore, FaBasketballBall, FaUtensils, FaCogs, FaCalendarAlt, FaUserShield } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const sidebarItems = [
  { label: 'Home', icon: <FaHome /> },
  { label: 'Contact us', icon: <FaEnvelope /> },
  { label: 'Pricing', icon: <FaTag /> },
];

const archetypes = [
  { label: 'Digital entrepreneurs', icon: <FaUserTie /> },
  { label: 'Record labels', icon: <FaMusic /> },
  { label: 'Movie studios', icon: <FaFilm /> },
  { label: 'Podcasters & YouTubers', icon: <FaPodcast /> },
  { label: 'E-Commerce brands', icon: <FaStore /> },
  { label: 'Sports franchises', icon: <FaBasketballBall /> },
  { label: 'Restaurant chains', icon: <FaUtensils /> },
  { label: 'Apps & SaaS', icon: <FaCogs /> },
  { label: 'Events', icon: <FaCalendarAlt /> },
  { label: 'Politicians', icon: <FaUserShield /> },
];

const archetypeCards = [
  {
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80',
    label: 'Digital Entrepreneur',
  },
  {
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    label: 'Podcaster',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    label: 'Sports Franchise',
  },
];

export default function UseCasesPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex bg-[#0a1747] text-white">
      {/* Sidebar */}
      <aside className="w-72 min-w-[220px] bg-[#0a1747] border-r border-[#1a2a5c] flex flex-col py-8 px-6">
        <div className="flex items-center gap-2 mb-10">
          <span className="bg-yellow-400 rounded p-1"><FaHome className="w-7 h-7 text-black" /></span>
          <span className="font-extrabold text-2xl text-white tracking-tight">Keys</span>
        </div>
        <nav className="flex flex-col gap-2 mb-8">
          {sidebarItems.map(item => (
            <button key={item.label} className="flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium hover:bg-[#16205a] transition text-white/90">
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="text-xs text-white/60 uppercase tracking-wider mb-2 mt-6">Archetypes</div>
        <div className="flex flex-col gap-1">
          {archetypes.map(item => (
            <button key={item.label} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-[#16205a] transition text-white/80">
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col px-12 py-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center mt-6 mb-12">
          <div className="flex gap-2 mb-4">
            <span className="bg-orange-600 text-xs text-white px-3 py-1 rounded-full font-semibold">New</span>
            <span className="bg-black text-xs text-yellow-400 px-3 py-1 rounded-full font-semibold">Content rewards</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-4">Who is Keys for?</h1>
          <p className="text-lg text-white/70 max-w-2xl mb-6">A simplified version of how to use the most powerful tool on the internet to grow your brand, connect with your audience, and make money.</p>
          <div className="flex gap-4">
            <button className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-3 rounded-full text-lg transition">Create a Key</button>
            <button className="bg-[#181c2f] hover:bg-[#232a4d] text-white font-semibold px-8 py-3 rounded-full text-lg border border-[#232a4d] transition">Book call</button>
          </div>
        </div>
        {/* Archetypes Section */}
        <h2 className="text-2xl font-bold mb-6">Archetypes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {archetypeCards.map(card => (
            <div key={card.label} className="bg-[#101c3a] rounded-2xl overflow-hidden shadow-lg flex flex-col items-center p-4">
              <img src={card.image} alt={card.label} className="w-full h-64 object-cover rounded-xl mb-4" />
              <span className="text-lg font-semibold mb-2">{card.label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 