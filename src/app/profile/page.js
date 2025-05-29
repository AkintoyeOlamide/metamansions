"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import DotsBackground from '@/components/DotsBackground';

// Create a client component that uses useSearchParams
function ProfileContent() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = searchParams.get('email');
    if (!email) {
      router.push('/signup');
    }
  }, [searchParams, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !username) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const email = searchParams.get('email').toLowerCase();
      await setDoc(doc(db, 'users', email.toLowerCase()), {
        name,
        username,
        email,
      }, { merge: true });
      router.push(`/profile-picture?email=${email}`);
    } catch (err) {
      setError(err.message || 'Error updating profile');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      <DotsBackground />
      <div className="w-full max-w-sm bg-black border border-yellow-600 rounded-xl p-8 flex flex-col items-center shadow-lg relative z-10">
        <h2 className="text-xl font-bold text-yellow-400 mb-6">Complete Your Profile</h2>
        {error && (
          <div className="w-full p-3 mb-4 text-sm text-red-500 bg-red-500/10 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-black border border-gray-700 text-gray-200 focus:outline-none focus:border-yellow-400"
            required
          />
          <input
            type="text"
            placeholder="Username *"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded bg-black border border-gray-700 text-gray-200 focus:outline-none focus:border-yellow-400"
            required
          />
          <button type="submit" className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded mt-2">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

// Main page component
export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileContent />
    </Suspense>
  );
} 