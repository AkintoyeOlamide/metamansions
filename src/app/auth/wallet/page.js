"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const holdings = [
  {
    name: "Golden Heights Estate",
    status: "Completed",
    location: "Beachfront District",
    visitors: 0,
    eth: 0.0,
    image: "/WhatsApp Image 2025-03-14 at 13.58.13.jpeg",
  },
  {
    name: "Crystal Palace",
    status: "In Construction",
    location: "Downtown Core",
    visitors: 0,
    eth: 0.0,
    image: "/WhatsApp Image 2025-03-14 at 13.58.12.jpeg",
  },
  {
    name: "Mountain View Villa",
    status: "Completed",
    location: "Alpine Heights",
    visitors: 0,
    eth: 0.0,
    image: "/WhatsApp Image 2025-03-14 at 13.58.12 (1).jpeg",
  },
];

const TABS = ["HOLDINGS", "TRANSACTIONS", "REWARDS"];

export default function WalletPage() {
  const [tab, setTab] = useState("HOLDINGS");
  const [walletAddress, setWalletAddress] = useState(null);
  const [keys, setKeys] = useState(0);
  const [keysChange, setKeysChange] = useState(0);

  // Connect wallet logic (placeholder)
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
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-yellow-100">Your Wallet</h1>
          <button
            onClick={connectWallet}
            className="bg-black border border-yellow-400 text-yellow-400 font-bold px-5 py-2 rounded-lg text-base shadow-lg hover:bg-yellow-400 hover:text-black transition-colors"
          >
            {walletAddress ? `Connected` : "CONNECT WALLET"}
          </button>
        </div>
        <p className="text-gray-300 mb-8">Manage your assets, track transactions, and monitor building projects</p>
        {/* Portfolio Value */}
        <div className="bg-[#18191c] border border-yellow-900 rounded-2xl p-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-gray-400 text-sm mb-1">Total Portfolio Value</div>
            <div className="text-5xl font-bold text-white mb-2">{keys.toFixed(2)} KEYS</div>
            <div className="flex items-center gap-2 text-green-400 font-mono text-sm">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>
              +{keysChange.toFixed(2)} KEYS (+0.00%)
            </div>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg text-base shadow-lg transition-colors flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              BUY MORE
            </button>
            <button className="bg-black border border-yellow-400 text-yellow-400 font-bold px-6 py-3 rounded-lg text-base shadow-lg transition-colors flex items-center gap-2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              CLAIM
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-8 border-b border-yellow-900 mb-8">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2 text-base font-bold uppercase tracking-wide focus:outline-none ${tab === t ? "text-yellow-400 border-b-2 border-yellow-400" : "text-gray-400 hover:text-yellow-400"}`}
            >
              {t}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        {tab === "HOLDINGS" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {holdings.map((item, idx) => (
              <div key={item.name} className="bg-[#18191c] border border-yellow-900 rounded-2xl shadow-lg flex flex-col">
                <div className="relative w-full h-48">
                  <Image src={item.image} alt={item.name} fill className="object-cover object-center rounded-t-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-2xl" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-400 text-lg font-bold">★ 0</span>
                    <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Completed' ? 'bg-green-900 text-green-400' : 'bg-yellow-900 text-yellow-400'}`}>{item.status}</span>
                  </div>
                  <div className="font-bold text-white text-lg mb-1">{item.name}</div>
                  <div className="text-gray-400 text-sm mb-2 flex items-center gap-2"><svg width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path d='M17.657 16.657L13.414 12.414a2 2 0 0 0-2.828 0l-4.243 4.243M15 11a3 3 0 1 0-6 0 3 3 0 0 0 6 0z'/></svg> {item.location}</div>
                  <div className="text-gray-400 text-xs mb-2 flex items-center gap-2"><svg width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path d='M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m9-7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z'/></svg> {item.visitors} visitors</div>
                  <div className="flex items-center gap-2 text-yellow-400 font-mono text-sm">
                    <span>{item.eth.toFixed(2)} ETH</span>
                    <span className="text-green-400 ml-2">+0.00 ETH (+0.00%)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "TRANSACTIONS" && (
          <div className="text-gray-400 text-center py-16">No transactions yet.</div>
        )}
        {tab === "REWARDS" && (
          <div className="text-gray-400 text-center py-16">No rewards yet.</div>
        )}
      </div>
    </div>
  );
} 