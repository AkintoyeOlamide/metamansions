"use client";

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaRegBell,        // Notifications (outline)
  FaRegCommentDots, // Messages (outline)
  FaTicketAlt,      // Affiliates (filled, no outline)
  FaRegUserCircle,  // Profile (outline)
  FaHammer,         // Build a Meta Mansion (hammer)
} from 'react-icons/fa';
import {
  FiHome,     // Home (outline)
  FiSearch,   // Search (outline)
  FiCompass,  // Discover (outline)
  FiFlag,     // Onboarding (flag icon)
  FiLogOut,   // Sign out (outline)
  FiMenu      // Menu (outline)
} from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const NAV_ITEMS_BASE = [
  { label: 'Home', icon: FiHome, href: '/auth', color: '' },
  { label: 'Search', icon: FiSearch, href: '/auth/search', color: '' },
  { label: 'Discover', icon: FiCompass, href: '/auth/discover', color: '' },
  { label: 'Onboarding', icon: FiFlag, href: '/auth/onboarding', color: '' },
  { label: 'Messages', icon: FaRegCommentDots, href: '/auth/messages', color: '' },
  { label: 'Notifications', icon: FaRegBell, href: '/auth/notifications', color: '' },
  { label: 'Build a Meta Mansion', icon: FaHammer, href: '/auth/build', color: '' },
  { label: 'Affiliates', icon: FaTicketAlt, href: '/auth/affiliates', color: '' },
];

export default function AuthSidebar() {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email.toLowerCase();
        const userDoc = await getDoc(doc(db, 'users', email));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.profilePicture) setProfilePic(data.profilePicture);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const NAV_ITEMS = [
    ...NAV_ITEMS_BASE,
    { label: 'Profile', icon: null, href: '/auth/profile', color: '' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-20 bg-black border-r border-yellow-600/20 flex flex-col">
      {/* Logo Section */}
      <div className="p-4 flex justify-center">
        <Link href="/" className="relative w-10 h-10 hover:opacity-80 transition-opacity">
          <Image
            src="/gold-logo.PNG"
            alt="Meta Mansions Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>
      </div>
      {/* Navigation Items */}
      <nav className="py-4 pt-16">
        <ul className="space-y-4">
          {NAV_ITEMS.map((item) => {
            return (
              <li key={item.label} className="flex justify-center">
                <a
                  href={item.href}
                  className="flex flex-col items-center group relative"
                >
                  <span className={`w-7 h-7 flex items-center justify-center rounded-full mb-1 group-hover:opacity-80 transition-opacity`}>
                    {item.label === 'Profile' ? (
                      profilePic ? (
                        <img src={profilePic} alt="Profile" width={28} height={28} className="rounded-full object-cover" />
                      ) : (
                        <FaRegUserCircle className="text-xl" />
                      )
                    ) : (
                      item.icon && <item.icon className="text-xl" />
                    )}
                  </span>
                  <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-50 px-4 py-2 min-w-[100px] rounded-lg bg-[rgba(23,23,23,0.95)] border border-white/10 text-yellow-400 text-sm font-medium opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 shadow-lg backdrop-blur-md">
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
} 