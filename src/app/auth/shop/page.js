"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const categories = [
  { name: "Art", icon: "🎨" },
  { name: "Furniture", icon: "🪑" },
  { name: "Vehicles", icon: "🚗" },
  { name: "Fashion", icon: "👕" },
  { name: "Sports", icon: "⚽" },
  { name: "Music", icon: "🎵" },
];

const trending = [
  {
    name: "Cyber Punk NFT",
    image: "/WhatsApp Image 2025-03-14 at 13.58.09 (2).jpeg",
    category: "Digital Art",
    rating: 5,
    sales: 156,
    price: "0.00 ETH",
    discount: "15% OFF",
    time: "2 days",
  },
  {
    name: "Abstract Dreams",
    image: "/WhatsApp Image 2025-03-14 at 13.58.12 (1).jpeg",
    category: "Digital Art",
    rating: 5,
    sales: 89,
    price: "0.00 ETH",
    discount: "20% OFF",
    time: "1 day",
  },
  {
    name: "Neon Genesis",
    image: "/WhatsApp Image 2025-03-14 at 13.58.08.jpeg",
    category: "Digital Art",
    rating: 5,
    sales: 234,
    price: "0.00 ETH",
    discount: "10% OFF",
    time: "3 days",
  },
];

const mansions = [
  {
    id: 4721,
    name: "Crystal Palace #4721",
    image: "/WhatsApp Image 2025-03-14 at 13.58.13.jpeg",
    rating: 5,
    items: 12,
    lastVisited: "2 hours ago",
    value: "0 ETH",
  },
  {
    id: 8392,
    name: "Sky Villa #8392",
    image: "/WhatsApp Image 2025-03-14 at 13.58.12.jpeg",
    rating: 5,
    items: 8,
    lastVisited: "1 day ago",
    value: "0 ETH",
  },
  {
    id: 6153,
    name: "Ocean View #6153",
    image: "/WhatsApp Image 2025-03-14 at 13.58.11.jpeg",
    rating: 5,
    items: 15,
    lastVisited: "3 hours ago",
    value: "0 ETH",
  },
];

const purchases = [
  {
    name: "Digital Horizon",
    image: "/WhatsApp Image 2025-03-14 at 13.58.10.jpeg",
  },
  {
    name: "Virtual Oasis",
    image: "/WhatsApp Image 2025-03-14 at 13.58.12 (3).jpeg",
  },
  {
    name: "Meta Gallery",
    image: "/WhatsApp Image 2025-03-14 at 13.58.08 (1).jpeg",
  },
];

const listedItems = [
  {
    name: "Cyber Punk NFT",
    image: "/WhatsApp Image 2025-03-14 at 13.58.09 (2).jpeg",
    category: "Digital Art",
    rating: 5,
    sales: 156,
    price: "0.00 ETH",
    discount: "15% OFF",
    time: "2 days",
  },
  {
    name: "Abstract Dreams",
    image: "/WhatsApp Image 2025-03-14 at 13.58.12 (1).jpeg",
    category: "Digital Art",
    rating: 5,
    sales: 89,
    price: "0.00 ETH",
    discount: "20% OFF",
    time: "1 day",
  },
  {
    name: "Neon Genesis",
    image: "/WhatsApp Image 2025-03-14 at 13.58.08.jpeg",
    category: "Digital Art",
    rating: 5,
    sales: 234,
    price: "0.00 ETH",
    discount: "10% OFF",
    time: "3 days",
  },
  {
    name: "Future Vision",
    image: "/WhatsApp Image 2025-03-14 at 13.58.10 (3).jpeg",
    category: "Digital Art",
    rating: 5,
    sales: 45,
    price: "0.00 ETH",
    discount: "12% OFF",
    time: "2 days",
  },
  {
    name: "Digital Dreamscape",
    image: "/WhatsApp Image 2025-03-14 at 13.58.09.jpeg",
    category: "Digital Art",
    rating: 5,
    sales: 67,
    price: "0.00 ETH",
    discount: "18% OFF",
    time: "1 day",
  },
  {
    name: "Quantum Realm",
    image: "/WhatsApp Image 2025-03-14 at 13.58.11 (2).jpeg",
    category: "Digital Art",
    rating: 5,
    sales: 102,
    price: "0.00 ETH",
    discount: "15% OFF",
    time: "3 days",
  },
];

export default function ShopPage() {
  // Wallet logic (copied/adapted from profile page)
  const [walletAddress, setWalletAddress] = useState(null);
  const [ethBalance, setEthBalance] = useState(0);
  const [ethPrice, setEthPrice] = useState(null);

  // Fetch ETH price
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setEthPrice(data.ethereum.usd);
      } catch (err) {
        console.error('Error fetching ETH price:', err);
      }
    };
    fetchEthPrice();
    const interval = setInterval(fetchEthPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch wallet balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (walletAddress && window.ethereum) {
        try {
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [walletAddress, 'latest']
          });
          const ethBal = parseInt(balance, 16) / Math.pow(10, 18);
          setEthBalance(ethBal);
        } catch (err) {
          console.error('Error fetching balance:', err);
        }
      }
    };
    fetchBalance();
  }, [walletAddress]);

  // Connect wallet
  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("MetaMask or another Ethereum wallet is not installed.");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
    } catch (err) {
      alert("Wallet connection failed.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-7xl mx-auto w-full relative">
        {/* Wallet Balance Top Right */}
        <div className="absolute right-0 top-0 mt-2 mr-2 flex items-center gap-2 bg-[#18191c] border border-yellow-600 rounded-lg px-4 py-2 shadow-lg z-10">
          {walletAddress && ethPrice ? (
            <div className="flex flex-col items-end text-right text-yellow-400 font-mono text-sm">
              <span>Balance: {ethBalance.toFixed(4)} ETH</span>
              <span className="text-yellow-500 ml-2">
                ≈ ${(ethBalance * ethPrice).toFixed(2)} USD
              </span>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-yellow-500 text-black px-3 py-1 rounded text-xs border border-black hover:bg-yellow-400 font-bold"
            >
              Connect Wallet
            </button>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Shopping</h1>
        <p className="text-gray-300 mb-8">Discover exclusive items inside Meta Mansion</p>

        {/* Your Mansions */}
        <div className="p-6 mb-10">
          <div className="flex items-center mb-4">
            <span className="text-xl mr-2">🏠</span>
            <span className="font-bold text-lg text-white">Your Mansions</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mansions.map((mansion) => (
              <div key={mansion.id} className="bg-black border border-gray-700 rounded-lg overflow-hidden shadow-lg flex flex-col">
                <div className="relative w-full h-48">
                  <Image src={mansion.image} alt={mansion.name} fill className="object-cover" />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="font-bold text-lg text-white mb-1">{mansion.name}</div>
                  <div className="flex items-center text-yellow-400 text-sm mb-1">
                    {Array.from({ length: mansion.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    <span className="ml-2 text-gray-400">({mansion.items} items)</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">Last visited: {mansion.lastVisited}</div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-yellow-400 font-bold text-lg">{mansion.value}</div>
                    <span className="text-xs text-gray-400 ml-2">Total Value</span>
                  </div>
                  <button className="mt-4 w-full py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg text-base transition-colors hover:from-yellow-500 hover:to-yellow-700">ENTER MANSION</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <span className="text-xl mr-2">🔒</span>
            <span className="font-bold text-lg text-white">Recent Purchases</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchases.map((purchase, idx) => (
              <div key={idx} className="bg-[#18191c] border border-yellow-600 rounded-lg overflow-hidden shadow-lg flex flex-col items-center">
                <div className="relative w-full h-32">
                  <Image src={purchase.image} alt={purchase.name} fill className="object-cover" />
                </div>
                <div className="p-4 w-full text-center">
                  <div className="font-bold text-white text-base mb-1">{purchase.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-10">
          <div className="font-bold text-xl mb-4 flex items-center gap-2">
            <span>🧩</span> Categories
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <div key={cat.name} className="bg-[#18191c] border border-[#222] rounded-lg flex flex-col items-center justify-center py-8 shadow hover:border-yellow-400 transition-all cursor-pointer">
                <span className="text-4xl mb-2">{cat.icon}</span>
                <span className="font-semibold text-white text-base">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Items */}
        <div className="mb-12">
          <div className="font-bold text-xl mb-4 flex items-center gap-2">
            <span>📈</span> Trending Items
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trending.map((item, idx) => (
              <div key={idx} className="bg-[#18191c] border border-yellow-600 rounded-lg overflow-hidden shadow-lg flex flex-col">
                <div className="relative w-full h-48">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">{item.discount}</span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="font-bold text-lg text-white mb-1">{item.name}</div>
                  <div className="text-gray-400 text-xs mb-1">{item.category}</div>
                  <div className="flex items-center text-yellow-400 text-sm mb-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    <span className="ml-2 text-gray-400">({item.sales} sales)</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-yellow-400 font-bold text-lg">{item.price}</div>
                    <div className="flex items-center text-xs text-gray-400 ml-2"><span className="mr-1">⏱️</span>{item.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Listed Items */}
        <div className="mb-16">
          <div className="flex items-center mb-4 gap-2">
            <span className="text-2xl">🔒</span>
            <span className="font-bold text-xl text-white">Listed Items</span>
          </div>
          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-700 mb-6">
            <button className="pb-2 text-base font-semibold uppercase tracking-wide text-white border-b-2 border-white focus:outline-none">ALL ITEMS</button>
            <button className="pb-2 text-base font-semibold uppercase tracking-wide text-gray-400 hover:text-white transition-colors">YOUR LISTINGS</button>
          </div>
          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listedItems.map((item, idx) => (
              <div key={idx} className="bg-[#18191c] border border-yellow-600 rounded-lg overflow-hidden shadow-lg flex flex-col">
                <div className="relative w-full h-48">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">{item.discount}</span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="font-bold text-lg text-white mb-1">{item.name}</div>
                  <div className="text-gray-400 text-xs mb-1">{item.category}</div>
                  <div className="flex items-center text-yellow-400 text-sm mb-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    <span className="ml-2 text-gray-400">({item.sales} sales)</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-yellow-400 font-bold text-lg">{item.price}</div>
                    <div className="flex items-center text-xs text-gray-400 ml-2"><span className="mr-1">⏱️</span>{item.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 