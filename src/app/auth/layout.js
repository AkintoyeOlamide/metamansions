"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import AuthSidebar from './AuthSidebar';

export default function AuthLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-black">
      <AuthSidebar />
      <main className="ml-23">
        {children}
      </main>
    </div>
  );
} 