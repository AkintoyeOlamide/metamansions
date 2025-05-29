"use client";
import Image from "next/image";

export default function AgentPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col items-start justify-center z-10">
          <div className="mb-6">
            <span className="inline-flex items-center px-8 py-3 rounded-2xl bg-yellow-900/60 border border-yellow-500 text-yellow-300 font-bold text-xl tracking-wide shadow-lg mb-4">
              <span className="mr-2">🚀</span> Coming Soon
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">AI-Powered </span>
            <span className="text-yellow-400">Avatar Builder</span>
          </h1>
          <p className="text-gray-300 mb-8 max-w-xl">
            Experience the future of digital identity with our advanced AI avatar generation system. Create unique, personalized avatars that perfectly match your vision using cutting-edge artificial intelligence.
          </p>
          <div className="flex gap-4 mb-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-7 py-3 rounded-full text-base shadow-lg transition-colors">GET NOTIFIED</button>
            <button className="border border-yellow-400 text-yellow-400 font-bold px-7 py-3 rounded-full text-base hover:bg-yellow-400 hover:text-black transition-colors">LEARN MORE</button>
          </div>
        </div>
        {/* Right: Avatar Card */}
        <div className="flex-1 flex items-center justify-center z-10">
          <div className="bg-black rounded-2xl border border-yellow-900/40 shadow-2xl p-6 flex flex-col items-center w-full max-w-md relative" style={{minHeight: 400}}>
            <div className="relative w-full h-80 flex items-center justify-center">
              <video
                src="/loop3.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="object-contain w-full h-full rounded-xl"
                style={{ background: 'black' }}
              />
            </div>
            <div className="mt-6 w-full">
              <div className="font-bold text-white text-lg mb-1">AI Avatar Creation</div>
              <div className="text-gray-400 text-xs">Watch how our AI creates unique digital avatars</div>
            </div>
          </div>
        </div>
      </div>
      {/* Gold Glow Effect */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{background: "radial-gradient(ellipse at 60% 20%, rgba(255,215,0,0.08) 0%, transparent 70%), radial-gradient(ellipse at 20% 80%, rgba(255,215,0,0.07) 0%, transparent 70%)"}} />
    </div>
  );
} 