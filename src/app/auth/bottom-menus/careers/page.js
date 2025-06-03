"use client";
import Image from 'next/image';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-12 pt-10">
        <div className="flex items-center gap-2">
          <span className="bg-yellow-400 rounded p-1">
            <Image src="/gold-logo.PNG" alt="Keys Logo" width={40} height={40} />
          </span>
          <span className="font-extrabold text-2xl text-black tracking-tight">Keys</span>
        </div>
        <a href="/" className="text-gray-500 font-semibold hover:underline">Go to Keys</a>
      </div>
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 mt-10">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-8 text-center">Working at Keys</h1>
        <button className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-10 py-4 rounded-full text-xl mb-12 transition">See Open Positions</button>
        <div className="w-full flex justify-center">
          <div className="rounded-3xl overflow-hidden shadow-lg max-w-5xl w-full">
            <img
              src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80"
              alt="Careers at Keys"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
} 