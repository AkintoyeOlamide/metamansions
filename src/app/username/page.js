"use client";
import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

function UsernameContent() {
  const [username, setUsername] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const helpBtnRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const email = searchParams.get('email');
    if (!email) {
      router.push('/signup');
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (!modalOpen) return;
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target) && helpBtnRef.current && !helpBtnRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [modalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const email = searchParams.get('email').toLowerCase();
    try {
      await setDoc(doc(db, 'users', email), { username }, { merge: true });
      setSuccess('Username saved successfully!');
      setTimeout(() => {
        router.push(`/birthday?email=${email}`);
      }, 1200);
    } catch (err) {
      setError('Failed to save username. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="absolute top-8 left-0 w-full flex justify-center z-20">
        <Link href="/">
          <Image src="/gold-logo.PNG" alt="Gold Logo" width={40} height={40} />
        </Link>
      </div>
      <div className="w-full max-w-md flex flex-col items-start justify-center">
        <div className="flex items-center w-full justify-start mb-2" style={{ position: 'relative' }}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white text-left flex-1 mb-2">Pick a username</h1>
          <button
            ref={helpBtnRef}
            aria-label="Help"
            onClick={() => setModalOpen(true)}
            className="ml-2 p-1 rounded-full border border-white text-xs font-bold focus:outline-none flex items-center justify-center bg-transparent"
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
                left: helpBtnRef.current ? helpBtnRef.current.offsetLeft + 40 : 40,
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
        <p className="text-gray-400 text-base text-left mb-8">It's like claiming your Instagram handle in 2012 ⚡</p>
        {success && (
          <div className="w-full p-3 mb-4 text-sm text-green-500 bg-green-500/10 rounded-lg text-center">
            {success}
          </div>
        )}
        {error && (
          <div className="w-full p-3 mb-4 text-sm text-red-500 bg-red-500/10 rounded-lg text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 items-start">
          <div className="w-full mb-2 relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-base select-none pointer-events-none"
              style={{ zIndex: 2 }}
            >
              keys.xyz/@
            </span>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-24 pr-4 py-3 rounded bg-black border border-yellow-600 text-white focus:outline-none focus:border-yellow-400 placeholder-gray-500 text-base font-semibold text-left"
              required
              style={{ minWidth: 0 }}
            />
          </div>
          <button type="submit" className="w-full py-3 rounded bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg transition-colors text-center">Next</button>
        </form>
      </div>
    </div>
  );
}

export default function UsernamePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UsernameContent />
    </Suspense>
  );
} 