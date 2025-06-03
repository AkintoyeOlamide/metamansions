"use client";
import { useState, Suspense, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DotsBackground from '@/components/DotsBackground';
import { FaCogs, FaFlask, FaTshirt, FaCamera, FaDumbbell } from 'react-icons/fa';
import { GiIsland, GiHouse } from 'react-icons/gi';
import Image from 'next/image';
import Link from 'next/link';

const EXPERIENCES = [
  {
    icon: <FaTshirt className="text-pink-400 text-2xl" />,
    title: "Fashion Forward Mansion",
    desc: "Design digital wearables, showcase outfits in your showroom, and sell them to other avatars.",
    members: 128,
    stars: 4.8,
  },
  {
    icon: <GiHouse className="text-green-400 text-2xl" />,
    title: "The Listing Lab",
    desc: "For agents, stagers, and content creators. Share virtual tours, get feedback on listings, and sell media packages or templates.",
    members: 92,
    stars: 4.6,
  },
  {
    icon: <GiIsland className="text-amber-500 text-2xl" />,
    title: "Investor Island",
    desc: "A private mastermind for real estate investors. Access off-market deals, share analysis tools, and sell exclusive reports or calculators.",
    members: 57,
    stars: 4.9,
  },
  {
    icon: <FaDumbbell className="text-red-400 text-2xl" />,
    title: "Fitness Freaks HQ",
    desc: "Create and sell fitness programs, meal plans, or training challenges inside a gamified virtual gym.",
    members: 211,
    stars: 4.7,
  },
];

function UserExperienceContent() {
  const [joinedIdx, setJoinedIdx] = useState(null);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const helpBtnRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!modalOpen) return;
    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        helpBtnRef.current &&
        !helpBtnRef.current.contains(event.target)
      ) {
        setModalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [modalOpen]);

  const handleContinue = () => {
    if (joinedIdx !== null) {
      router.push('/auth/onboarding');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      <DotsBackground />
      <div className="absolute top-8 left-0 w-full flex justify-center z-20">
        <Link href="/">
          <Image src="/gold-logo.PNG" alt="Gold Logo" width={40} height={40} />
        </Link>
      </div>
      <div className="w-full max-w-2xl mx-auto py-12 px-4 relative z-10">
        <div className="flex items-center w-full justify-between mt-16 mb-4" style={{ position: 'relative' }}>
          <div className="flex flex-col flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white text-left">Join a Meta Mansion</h1>
            <p className="text-gray-400 text-sm mt-4 text-left max-w-xl">Yes it is required. How else would you know how the platform works.</p>
          </div>
          <button
            ref={helpBtnRef}
            aria-label="Help"
            onClick={() => setModalOpen(true)}
            className="p-1 rounded-full border border-white text-xs font-bold focus:outline-none flex items-center justify-center bg-transparent"
            style={{ width: 24, height: 24 }}
          >
            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px', lineHeight: 1 }}>?</span>
          </button>
          {modalOpen && (
            <div
              className="z-50"
              style={{
                position: 'absolute',
                top: helpBtnRef.current ? helpBtnRef.current.offsetTop + helpBtnRef.current.offsetHeight : 0,
                right: 0,
                minWidth: '180px',
              }}
            >
              <div ref={modalRef} className="bg-black rounded-lg p-3 relative text-white" style={{ border: '0.5px solid #fff' }}>
                <div className="flex flex-col mt-1">
                  <button
                    className="w-full py-2 text-white bg-transparent hover:bg-white/10 rounded text-left"
                    onClick={() => { setModalOpen(false); window.open('mailto:support@yourdomain.com'); }}
                  >
                    Contact Support
                  </button>
                  <button
                    className="w-full py-2 text-white bg-transparent hover:bg-white/10 rounded text-left"
                    onClick={() => { setModalOpen(false); router.push('/'); }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 p-5 bg-black/80 transition-all ${idx < EXPERIENCES.length - 1 ? 'border-b border-gray-700' : ''}`}
          >
            <div className="text-2xl">{exp.icon}</div>
            <div className="flex-1">
              <div className="font-bold text-yellow-400 text-lg mb-1 text-left">{exp.title}</div>
              <div className="flex items-center gap-4 mb-1 text-left">
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' width='16' height='16'><path fill='currentColor' d='M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z'/></svg>
                  {exp.members.toLocaleString()} members
                </div>
                <div className="flex items-center gap-1 text-yellow-400 text-xs">
                  <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20' width='14' height='14'><path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 0 0 .95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 0 0-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118l-3.385-2.46a1 1 0 0 0-1.175 0l-3.385 2.46c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 0 0-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 0 0 .95-.69l1.286-3.967Z'/></svg>
                  {exp.stars}
                </div>
              </div>
              <div className="text-gray-300 text-sm text-left">{exp.desc}</div>
            </div>
            <button
              className={`px-6 py-2 rounded-lg font-bold text-base transition-colors ${joinedIdx === idx ? 'bg-white text-black' : 'bg-yellow-500 text-black hover:bg-yellow-600'}`}
              onClick={() => setJoinedIdx(joinedIdx === idx ? null : idx)}
            >
              {joinedIdx === idx ? 'Joined' : 'Join'}
            </button>
          </div>
        ))}
        <button
          className="w-full py-2 rounded bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold text-base transition"
          disabled={joinedIdx === null}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default function UserExperience() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserExperienceContent />
    </Suspense>
  );
} 