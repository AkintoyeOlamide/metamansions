"use client";

import { usePathname } from 'next/navigation';
import Sidebar from "./Sidebar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  return (
    <div className="flex min-h-screen w-full bg-black">
      {!isAuthPage && <Sidebar />}
      <div className="flex-1">{children}</div>
    </div>
  );
} 