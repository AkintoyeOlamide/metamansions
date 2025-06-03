"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingBottomBar from '../OnboardingBottomBar';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function OnboardingLink() {
  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const maxLength = 30;
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchName = async () => {
      try {
        const userEmail = auth.currentUser.email.toLowerCase();
        const userDoc = await getDoc(doc(db, 'users', userEmail));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.mansionName || '');
        }
      } catch (err) {
        setName('');
      }
    };
    fetchName();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!link.trim()) {
      setError('Please enter a link for your Meta Mansion');
      return;
    }
    setError('');
    setSuccess('');
    router.push('/auth/onboarding/dashboard');
  };

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="w-full border-b border-zinc-800 pt-3">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-white ml-2">Onboarding</h1>
          <button className="px-4 py-1 border border-zinc-600 rounded-lg text-sm text-white hover:bg-zinc-800 transition">Contact sales</button>
        </div>
      </div>
      {/* Centered Card */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full rounded-xl shadow-lg p-2 flex flex-col items-center mx-auto">
          <h2 className="text-xl font-bold text-white mb-2 text-center">Choose your Meta Mansion link</h2>
          <p className="text-zinc-400 text-sm mb-6 text-center">{name ? `For: ${name}` : ''} This is the link you send to your customers.</p>
          <div className="w-[55%] mx-auto mb-4">
            <div className="flex items-center w-full border border-zinc-700 rounded bg-zinc-800 focus-within:border-yellow-400">
              <span className="px-3 py-2 text-zinc-400 text-sm select-none">Keys.xyz/</span>
              <input
                type="text"
                value={link}
                onChange={e => {
                  if (e.target.value.length <= maxLength) setLink(e.target.value);
                }}
                className="w-full px-4 py-2 bg-transparent text-white outline-none text-base"
              />
            </div>
            <div className="text-right text-xs text-zinc-500 mt-1">{link.length} / {maxLength}</div>
          </div>
          <div className="w-[55%] mx-auto">
            <button
              className="w-full py-2 rounded bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold text-base transition"
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