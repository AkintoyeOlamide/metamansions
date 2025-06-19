"use client";

import { usePathname } from 'next/navigation';
import Sidebar from "./Sidebar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');
  const isProfilePage = pathname.startsWith('/profile');

  const hideSidebar = (
    pathname.startsWith('/auth') ||
    pathname.startsWith('/leaderboard') ||
    [
      '/profile',
      '/username',
      '/birthday',
      '/profile-picture',
      '/verify',
      '/user-experience',
      '/signup',
      '/password-setup',
    ].some((p) => pathname.startsWith(p))
  );

  return (
    <div className="flex min-h-screen w-full bg-black">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1">{children}</div>
    </div>
  );
} 