"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { FaUser, FaLock, FaWallet, FaHistory, FaSignOutAlt, FaCog, FaLink, FaCreditCard, FaBalanceScale, FaExclamationTriangle } from "react-icons/fa";

const sidebarSections = [
  { label: "General", icon: <FaCog />, href: "/auth/profile" },
  { label: "Connected accounts", icon: <FaLink />, href: "/auth/profile/connected-accounts" },
  { label: "Security & Privacy", icon: <FaLock />, href: "/auth/profile/security" },
  { label: "Payment methods", icon: <FaCreditCard />, href: "/auth/profile/payment" },
  { label: "Balance", icon: <FaBalanceScale />, href: "/auth/profile/balance" },
  { label: "Billing history", icon: <FaHistory />, href: "/auth/profile/billing" },
  { label: "Memberships", icon: <FaWallet />, href: "/auth/profile/memberships" },
  { label: "Resolution center", icon: <FaExclamationTriangle />, href: "/auth/profile/resolution" },
  { label: "Danger zone", icon: <FaSignOutAlt />, href: "/auth/profile/danger" },
];

export default function SidebarClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [sidebarName, setSidebarName] = useState("");
  const [sidebarUsername, setSidebarUsername] = useState("");
  const [loadingSidebar, setLoadingSidebar] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push('/');
        return;
      }

      const email = user.email.toLowerCase();
      const userDoc = await getDoc(doc(db, 'users', email));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        setProfilePic(data.profilePicture || null);
        setSidebarName(data.name || "");
        setSidebarUsername(data.username || "");
      } else {
        setProfilePic(null);
        setSidebarName("");
        setSidebarUsername("");
      }
      
      setLoadingSidebar(false);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <aside className="w-80 border-r border-zinc-800 flex flex-col justify-between bg-transparent">
      <div>
        <div className="flex flex-col items-center pt-8 pb-4 w-full">
          <div className="text-white text-lg font-bold mb-6">Account settings</div>
          {loadingSidebar ? (
            <div className="w-20 h-20 rounded-full bg-zinc-800 animate-pulse mb-2" />
          ) : profilePic ? (
            <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-yellow-400 mb-2" />
          ) : (
            <img src="/profile-placeholder.png" alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-zinc-700 mb-2" />
          )}
          {!loadingSidebar && (
            <>
              <div className="text-white text-base font-semibold">{sidebarName}</div>
              <div className="text-zinc-400 text-sm mb-4">@{sidebarUsername}</div>
            </>
          )}
          <div className="w-full border-b border-zinc-800"></div>
        </div>
        <nav className="flex-1">
          <ul className="space-y-1 px-6">
            {sidebarSections.map((section) => (
              <li key={section.label}>
                <Link href={section.href} className="flex items-center w-full text-zinc-300 hover:bg-zinc-800 px-3 py-2 rounded transition">
                  <span className="mr-3 text-lg">{section.icon}</span>
                  <span className="text-sm">{section.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button
        className="flex items-center justify-center w-full text-red-400 py-4 border-t border-zinc-800 text-base font-semibold hover:bg-zinc-900 transition"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </aside>
  );
} 