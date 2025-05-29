"use client";

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaHome, 
  FaUser, 
  FaCubes, 
  FaShoppingCart, 
  FaGamepad, 
  FaUserTie, 
  FaUsers, 
  FaWallet, 
  FaCog,
  FaSignOutAlt 
} from 'react-icons/fa';

const NAV_ITEMS = [
  { label: 'Home', icon: FaHome, href: '/auth', color: 'bg-gray-700 text-white' },
  { label: 'Profile', icon: FaUser, href: '/auth/profile', color: 'bg-gray-700 text-white' },
  { label: 'Build', icon: FaCubes, href: '/auth/build', color: 'bg-gray-700 text-white' },
  { label: 'Shop', icon: FaShoppingCart, href: '/auth/shop', color: 'bg-gray-700 text-white' },
  { label: 'Play', icon: FaGamepad, href: '/auth/play', color: 'bg-gray-700 text-white' },
  { label: 'Agent', icon: FaUserTie, href: '/auth/agent', color: 'bg-gray-700 text-white' },
  { label: 'Friends', icon: FaUsers, href: '/auth/friends', color: 'bg-gray-700 text-white' },
  { label: 'Wallet', icon: FaWallet, href: '/auth/wallet', color: 'bg-gray-700 text-white' },
  { label: 'Settings', icon: FaCog, href: '/auth/settings', color: 'bg-gray-700 text-white' },
];

export default function AuthSidebar() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-32 bg-black border-r border-yellow-600/20 flex flex-col">
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
      <nav className="flex-1 py-4">
        <ul className="space-y-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="flex justify-center">
                <a
                  href={item.href}
                  className="flex flex-col items-center group"
                >
                  <span className={`w-7 h-7 flex items-center justify-center rounded-full ${item.color} mb-1 group-hover:opacity-80 transition-opacity`}>
                    <Icon className="text-xs" />
                  </span>
                  <span className="font-medium text-[10px] text-gray-400 group-hover:text-white transition-colors">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sign Out Button */}
      <div className="p-6 mt-auto">
        <button
          onClick={handleSignOut}
          className="flex flex-col items-center w-full group"
        >
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white mb-1 group-hover:opacity-80 transition-opacity">
            <FaSignOutAlt className="text-xs" />
          </span>
          <span className="font-medium text-[10px] text-gray-400 group-hover:text-white transition-colors">Sign Out</span>
        </button>
      </div>
    </div>
  );
} 