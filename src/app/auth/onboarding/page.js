"use client";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingBottomBar from './OnboardingBottomBar';
import { doc, setDoc } from 'firebase/firestore';
import { auth } from '@/lib/firebase';

export default function Onboarding() {
  const [name, setName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sound, setSound] = useState(true);
  const [devMode, setDevMode] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const menuPopoverRef = useRef(null);
  const maxLength = 30;
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a name for your Meta Mansion');
      return;
    }
    setError('');
    setSuccess('');
    router.push(`/auth/onboarding/link?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="w-full border-b border-zinc-800 pt-3" style={{marginTop: 0, paddingTop: 0, paddingBottom: 0}}>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-white ml-2">Onboarding</h1>
          <button className="px-4 py-1 border border-zinc-600 rounded-lg text-sm text-white hover:bg-zinc-800 transition">Contact sales</button>
        </div>
      </div>
      {/* Centered Card */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full rounded-xl shadow-lg p-8 flex flex-col items-center">
          <h2 className="text-xl font-bold text-white mb-2 text-center">Name your Meta Mansion</h2>
          <p className="text-zinc-400 text-sm mb-6 text-center">This is the name of your digital business. Don't worry, you can change this later.</p>
          <div className="w-full mb-6 flex justify-center">
            <div className="w-[55%]">
              <input
                type="text"
                value={name}
                onChange={e => {
                  if (e.target.value.length <= maxLength) setName(e.target.value);
                }}
                placeholder="My store"
                className="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:border-yellow-400 outline-none text-base"
              />
              <div className="text-right text-xs text-zinc-500 mt-1">{name.length} / {maxLength}</div>
            </div>
          </div>
          <div className="w-[55%] mx-auto mb-2">
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            {success && <div className="text-green-500 text-sm mb-2">{success}</div>}
          </div>
          <div className="w-[55%] mx-auto">
            <button
              className="w-full py-2 rounded bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold text-base transition"
              disabled={!name.trim()}
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <OnboardingBottomBar />
    </div>
  );
} 