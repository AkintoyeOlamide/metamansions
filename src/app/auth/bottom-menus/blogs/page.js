"use client";
import { FaBlog, FaSearch, FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const NAV_TABS = [
  'Recent', 'Affiliate', 'Apps', 'Business', 'Community', 'Courses', 'Digital Products', 'Discord', 'Ecommerce', 'Eng', 'Guides', 'Making Money', 'Podcasts'
];

const blogPosts = [
  {
    id: 1,
    category: 'Business',
    title: '80 small business ideas to start in 2025',
    author: 'Keisha Singleton',
    date: 'May 30, 2025',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    category: 'Trading',
    title: 'Top 17 best day trading courses [June 2025]',
    author: 'Druvi Storer',
    date: 'May 30, 2025',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    category: 'Trading',
    title: 'Top 38 best trading Discord servers [June 2025]',
    author: 'Druvi Storer',
    date: 'May 30, 2025',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    category: 'Apps · Community',
    title: '20 best online community platforms of 2025 (free and paid)',
    author: 'Druvi Storer',
    date: 'May 29, 2025',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
];

export default function BlogsPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      {/* Header Bar */}
      <header className="w-full bg-zinc-900 border-b border-zinc-800 px-8 pt-6 pb-2 flex flex-col sticky top-0 z-50">
        <div className="flex items-center justify-between w-full mb-3">
          {/* Keys BLOG Logo Far Left */}
          <div className="flex items-center gap-2">
            <span className="bg-yellow-400 rounded p-1"><FaBlog className="w-7 h-7 text-black" /></span>
            <span className="font-extrabold text-2xl text-white tracking-tight">Keys</span>
            <span className="font-bold text-lg ml-1" style={{ color: '#FFD700' }}>BLOG</span>
          </div>
          {/* Right: Search and Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded hover:bg-zinc-800 transition"><FaSearch className="w-5 h-5 text-gray-300" /></button>
            <button className="bg-zinc-800 text-white px-4 py-1.5 rounded font-semibold text-sm hover:bg-zinc-700 transition">Start Selling</button>
            <button className="bg-yellow-400 text-black px-4 py-1.5 rounded font-semibold text-sm hover:bg-yellow-300 transition">Go to Keys</button>
          </div>
        </div>
        {/* Navigation Tabs Centered Below */}
        <nav className="flex justify-center gap-6 w-full mb-2">
          {NAV_TABS.map(tab => (
            <button key={tab} className="text-sm text-gray-200 hover:text-yellow-400 font-medium px-2 py-1 transition">
              {tab}
            </button>
          ))}
        </nav>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex flex-row gap-8 px-12 py-10 max-w-[1400px] mx-auto w-full">
        {/* Left: Featured Post */}
        <section className="flex-1 max-w-[600px]">
          <div className="bg-zinc-800 rounded-2xl overflow-hidden mb-8 shadow-lg">
            <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80" alt="What's New on Keys" className="w-full h-64 object-cover" />
            <div className="p-6">
              <span className="text-blue-400 text-xs font-semibold mb-2 block">Keys</span>
              <h1 className="text-3xl font-bold mb-3">What's new on Keys?</h1>
              <p className="text-gray-300 mb-4">New week, new features you actually asked for: lifetime affiliate payouts, sharper search, cleaner chats, and a smoother dashboard. Let's get into it.</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>by Liv Carr</span>
                <span>·</span>
                <span>May 30, 2025</span>
              </div>
            </div>
          </div>
        </section>
        {/* Right: Blog List */}
        <aside className="w-[420px] flex flex-col gap-6">
          {blogPosts.map(post => (
            <div key={post.id} className="flex gap-4 bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 hover:border-yellow-400 transition shadow">
              <img src={post.image} alt={post.title} className="w-36 h-28 object-cover" />
              <div className="flex-1 flex flex-col justify-between py-3 pr-3">
                <div>
                  <span className="text-blue-400 text-xs font-semibold mb-1 block">{post.category}</span>
                  <h3 className="text-lg font-bold mb-1 leading-tight">{post.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                  <span>by {post.author}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </aside>
      </main>
    </div>
  );
} 