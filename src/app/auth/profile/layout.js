import SidebarClient from './SidebarClient';

export default function ProfileLayout({ children }) {
  return (
    <div className="min-h-screen bg-black flex">
      <SidebarClient />
      <main className="flex-1">{children}</main>
    </div>
  );
} 