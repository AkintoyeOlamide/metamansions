"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const carouselImages = [
  {
    image: "/game4.jpg",
    alt: "Meta Mansion Championship"
  },
  {
    image: "/game2.jpg",
    alt: "Property Wars"
  },
  {
    image: "/game3.jpg",
    alt: "Dart Championship"
  }
];

const games = [
  {
    image: "/game.jpg",
    alt: "Game 1",
  },
  {
    image: "/game2.jpg",
    alt: "Game 2",
  },
  {
    image: "/game3.jpg",
    alt: "Game 3",
  },
];

// Top players placeholder data
const topPlayers = [
  {
    name: "CryptoKing",
    games: 156,
    eth: 234.56,
  },
  {
    name: "MetaMaster",
    games: 142,
    eth: 198.32,
  },
  {
    name: "GamePro",
    games: 128,
    eth: 167.89,
  },
  {
    name: "MansionLord",
    games: 115,
    eth: 145.67,
  },
  {
    name: "PropertyQueen",
    games: 98,
    eth: 123.45,
  },
];

export default function PlayPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Play & Earn with Meta Mansion</h1>
            <p className="text-gray-300">Compete for rewards with your friends</p>
          </div>
          <div className="flex gap-4 self-end md:self-auto">
            <div className="bg-[#18191c] border border-yellow-600 rounded-lg px-8 py-4 flex items-center gap-3 shadow">
              <span className="text-yellow-400 text-2xl">🏆</span>
              <span className="font-bold text-lg">Rewards</span>
              <span className="text-yellow-400 font-mono text-lg">0.00</span>
            </div>
            <div className="bg-[#18191c] border border-yellow-600 rounded-lg px-8 py-4 flex items-center gap-3 shadow">
              <span className="text-yellow-400 text-2xl">👥</span>
              <span className="font-bold text-lg">Players</span>
              <span className="text-yellow-400 font-mono text-lg">0.00</span>
            </div>
          </div>
        </div>

        {/* New Carousel Section */}
        <div className="relative w-full h-[400px] mb-10 rounded-2xl overflow-hidden border-2 border-yellow-600">
          {carouselImages.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white text-center px-4">
                  {item.alt}
                </h2>
              </div>
            </div>
          ))}
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
            {carouselImages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-yellow-400 w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Game Cards Section (from screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Meta Mansion Royale */}
          <div className="rounded-2xl overflow-hidden bg-[#18191c] border border-yellow-600 shadow-lg flex flex-col">
            <div className="relative w-full h-48">
              <Image src="/game.jpg" alt="Meta Mansion Royale" fill className="object-cover object-center" />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Meta Mansion Royale</h3>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-yellow-400">★ 0</span>
                  <span className="text-gray-300">0.00 playing</span>
                </div>
                <div className="text-gray-400 text-sm mb-4">Battle Royale</div>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-5 rounded-lg flex items-center gap-2 text-sm">
                  ▶ Play Now
                </button>
                <button className="bg-[#232323] hover:bg-yellow-500/20 text-yellow-400 p-2 rounded-full">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
                <button className="bg-[#232323] hover:bg-yellow-500/20 text-yellow-400 p-2 rounded-full">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v14"/></svg>
                </button>
              </div>
            </div>
          </div>
          {/* Mansion Tycoon */}
          <div className="rounded-2xl overflow-hidden bg-[#18191c] border border-yellow-600 shadow-lg flex flex-col">
            <div className="relative w-full h-48">
              <Image src="/game2.jpg" alt="Mansion Tycoon" fill className="object-cover object-center" />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Mansion Tycoon</h3>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-yellow-400">★ 0</span>
                  <span className="text-gray-300">0.00 playing</span>
                </div>
                <div className="text-gray-400 text-sm mb-4">Strategy</div>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-5 rounded-lg flex items-center gap-2 text-sm">
                  ▶ Play Now
                </button>
                <button className="bg-[#232323] hover:bg-yellow-500/20 text-yellow-400 p-2 rounded-full">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
                <button className="bg-[#232323] hover:bg-yellow-500/20 text-yellow-400 p-2 rounded-full">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v14"/></svg>
                </button>
              </div>
            </div>
          </div>
          {/* Property Masters */}
          <div className="rounded-2xl overflow-hidden bg-[#18191c] border border-yellow-600 shadow-lg flex flex-col">
            <div className="relative w-full h-48">
              <Image src="/game3.jpg" alt="Property Masters" fill className="object-cover object-center" />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Property Masters</h3>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-yellow-400">★ 0</span>
                  <span className="text-gray-300">0.00 playing</span>
                </div>
                <div className="text-gray-400 text-sm mb-4">Simulation</div>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-5 rounded-lg flex items-center gap-2 text-sm">
                  ▶ Play Now
                </button>
                <button className="bg-[#232323] hover:bg-yellow-500/20 text-yellow-400 p-2 rounded-full">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
                <button className="bg-[#232323] hover:bg-yellow-500/20 text-yellow-400 p-2 rounded-full">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v14"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {/* Action Games */}
          <div className="rounded-2xl overflow-hidden bg-[#18191c] border border-yellow-600 shadow-lg flex flex-col items-center p-6">
            <Image src="/game.jpg" alt="Action Games" width={120} height={80} className="object-cover rounded-xl mb-3 opacity-60" />
            <div className="text-white font-bold text-lg mb-1">Action Games</div>
            <div className="bg-yellow-400/80 text-black text-xs font-bold px-3 py-1 rounded-full mb-1">0.00 Games</div>
            <div className="text-yellow-400 text-xs flex items-center gap-1"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 6l-4 4-4-4"/></svg> Trending</div>
          </div>
          {/* Strategy */}
          <div className="rounded-2xl overflow-hidden bg-[#18191c] border border-yellow-600 shadow-lg flex flex-col items-center p-6">
            <Image src="/game2.jpg" alt="Strategy" width={120} height={80} className="object-cover rounded-xl mb-3 opacity-60" />
            <div className="text-white font-bold text-lg mb-1">Strategy</div>
            <div className="bg-yellow-400/80 text-black text-xs font-bold px-3 py-1 rounded-full mb-1">0.00 Games</div>
            <div className="text-yellow-400 text-xs flex items-center gap-1"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 6l-4 4-4-4"/></svg> Trending</div>
          </div>
          {/* Adventure */}
          <div className="rounded-2xl overflow-hidden bg-[#18191c] border border-yellow-600 shadow-lg flex flex-col items-center p-6">
            <Image src="/game.jpg" alt="Adventure" width={120} height={80} className="object-cover rounded-xl mb-3 opacity-60" />
            <div className="text-white font-bold text-lg mb-1">Adventure</div>
            <div className="bg-yellow-400/80 text-black text-xs font-bold px-3 py-1 rounded-full mb-1">0.00 Games</div>
            <div className="text-yellow-400 text-xs flex items-center gap-1"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 6l-4 4-4-4"/></svg> Trending</div>
          </div>
          {/* Simulation */}
          <div className="rounded-2xl overflow-hidden bg-[#18191c] border border-yellow-600 shadow-lg flex flex-col items-center p-6">
            <Image src="/game3.jpg" alt="Simulation" width={120} height={80} className="object-cover rounded-xl mb-3 opacity-60" />
            <div className="text-white font-bold text-lg mb-1">Simulation</div>
            <div className="bg-yellow-400/80 text-black text-xs font-bold px-3 py-1 rounded-full mb-1">0.00 Games</div>
            <div className="text-yellow-400 text-xs flex items-center gap-1"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 6l-4 4-4-4"/></svg> Trending</div>
          </div>
        </div>

        {/* Top Players Section */}
        <h2 className="text-2xl font-bold mb-6">Top Players</h2>
        <div className="bg-[#18191c] rounded-2xl p-6 mb-12 w-full">
          {topPlayers.map((player, idx) => (
            <div
              key={player.name}
              className={`flex items-center justify-between px-4 py-4 mb-3 rounded-xl ${
                idx < 3 ? 'bg-yellow-900/40 border border-yellow-700' : 'bg-[#232323] border border-[#232323]'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg ${
                  idx < 3 ? 'bg-yellow-700 text-yellow-200' : 'bg-[#333] text-gray-200'
                }`}>
                  #{idx + 1}
                </span>
                <div>
                  <div className="font-bold text-white text-lg">{player.name}</div>
                  <div className="text-gray-300 text-xs">{player.games} games played</div>
                </div>
              </div>
              <span className={`px-5 py-2 rounded-lg font-bold text-sm ${
                idx < 3 ? 'bg-yellow-900/60 text-yellow-300 border border-yellow-700' : 'bg-[#232323] text-yellow-200 border border-[#333]'
              }`}>
                {player.eth.toFixed(2)} ETH
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 