"use client";

import { useRouter } from 'next/navigation';

export default function DangerZonePage() {
  const router = useRouter();

  const handleSignOut = () => {
    // For now, just redirect to the signin page
    router.push('/auth/signin');
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion logic
    console.log('Delete account clicked');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col px-12 py-10">
      <div className="space-y-2">
        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-3 rounded-lg text-left transition-colors"
        >
          Sign out
        </button>

        {/* Delete Account Button */}
        <button
          onClick={handleDeleteAccount}
          className="w-full bg-zinc-900 hover:bg-zinc-800 text-[#FF4444] px-4 py-3 rounded-lg text-left transition-colors"
        >
          Delete account
        </button>
      </div>
    </div>
  );
} 