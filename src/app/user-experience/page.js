"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DotsBackground from '@/components/DotsBackground';
import { FaCogs, FaFlask, FaTshirt, FaCamera, FaDumbbell } from 'react-icons/fa';
import { GiIsland, GiHouse } from 'react-icons/gi';

const EXPERIENCES = [
  {
    icon: <FaCamera className="text-yellow-400 text-2xl" />, 
    title: "Clip King's Studio",
    desc: "Learn how to go viral by clipping trending content and selling editing tools or presets."
  },
  {
    icon: <FaFlask className="text-blue-400 text-2xl" />,
    title: "The Creator's Lab",
    desc: "Build, test, and monetize your own mini-games, tools, or digital add-ons. Great for developers and hobbyists."
  },
  {
    icon: <FaTshirt className="text-pink-400 text-2xl" />,
    title: "Fashion Forward Mansion",
    desc: "Design digital wearables, showcase outfits in your showroom, and sell them to other avatars."
  },
  {
    icon: <GiHouse className="text-green-400 text-2xl" />,
    title: "The Listing Lab",
    desc: "For agents, stagers, and content creators. Share virtual tours, get feedback on listings, and sell media packages or templates."
  },
  {
    icon: <GiIsland className="text-amber-500 text-2xl" />,
    title: "Investor Island",
    desc: "A private mastermind for real estate investors. Access off-market deals, share analysis tools, and sell exclusive reports or calculators."
  },
  {
    icon: <FaCamera className="text-purple-400 text-2xl" />,
    title: "Million Dollar Media House",
    desc: "Built for videographers, drone pilots, and editors. Sell LUTs, offer editing services, and showcase your portfolio."
  },
  {
    icon: <FaDumbbell className="text-red-400 text-2xl" />,
    title: "Fitness Freaks HQ",
    desc: "Create and sell fitness programs, meal plans, or training challenges inside a gamified virtual gym."
  },
];

export default function UserExperience() {
  const [selected, setSelected] = useState(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selected !== null) {
      router.push('/auth');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      <DotsBackground />
      <div className="w-full max-w-2xl mx-auto py-12 px-4 relative z-10">
        {EXPERIENCES.map((exp, idx) => (
          <label
            key={idx}
            className={`flex items-center gap-4 border border-yellow-600 rounded-lg p-5 mb-5 bg-black/80 cursor-pointer transition-all ${selected === idx ? 'ring-2 ring-yellow-400 bg-yellow-900/10' : ''}`}
          >
            <input
              type="radio"
              name="experience"
              checked={selected === idx}
              onChange={() => setSelected(idx)}
              className="accent-yellow-400 w-6 h-6"
              style={{ minWidth: 24, minHeight: 24 }}
            />
            <div className="text-2xl">{exp.icon}</div>
            <div>
              <div className="font-bold text-yellow-400 text-lg mb-1">{exp.title}</div>
              <div className="text-gray-300 text-sm">{exp.desc}</div>
            </div>
          </label>
        ))}
        <button
          className="w-full mt-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selected === null}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
} 