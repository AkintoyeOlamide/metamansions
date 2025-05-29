"use client";

import Image from 'next/image';
import { useState } from 'react';

export default function AuthDashboard() {
  const [tab, setTab] = useState('CHAT');
  const [walletAddress, setWalletAddress] = useState(null);

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
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 w-full h-[calc(100vh-4rem)] px-2 py-8 bg-black">
      {/* Main Content */}
      <div className="flex flex-col gap-8 h-full justify-between">
        {/* Happening Now Card */}
        <div className="flex items-center gap-4 bg-[#18191c] border border-yellow-500 rounded-lg shadow-lg p-5">
          <Image src="/gold-logo.PNG" alt="Logo" width={36} height={36} />
          <div>
            <div className="font-bold text-yellow-400 text-base tracking-wider uppercase">Happening now</div>
            <div className="text-gray-300 text-xs font-mono">Built a social media presence</div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-[#18191c] border border-yellow-500 rounded-lg shadow-lg p-0 flex flex-col flex-1 justify-between">
          {/* Tabs */}
          <div className="flex border-b border-yellow-500">
            <button
              className={`px-6 py-3 text-xs font-semibold tracking-widest focus:outline-none transition-colors font-mono ${tab === 'CHAT' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'}`}
              onClick={() => setTab('CHAT')}
            >
              CHAT
            </button>
            <button
              className={`px-6 py-3 text-xs font-semibold tracking-widest focus:outline-none transition-colors font-mono ${tab === 'EARN' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'}`}
              onClick={() => setTab('EARN')}
            >
              EARN
            </button>
          </div>
          {/* Posts List */}
          <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
            {/* Example Post Cards */}
            <div className="flex items-center gap-4 bg-[#141517] border border-yellow-500 rounded-lg p-4 shadow-sm">
              <Image src="/gold-logo.PNG" alt="Logo" width={28} height={28} />
              <div>
                <div className="font-bold text-yellow-400 text-sm font-mono">Lovable chat</div>
                <div className="text-gray-300 text-xs font-mono">Built a social media presence</div>
              </div>
              <div className="ml-auto text-yellow-400 text-xs font-bold font-mono">5 online</div>
            </div>
            <div className="flex items-center gap-4 bg-[#141517] border border-yellow-500 rounded-lg p-4 shadow-sm">
              <Image src="/gold-logo.PNG" alt="Logo" width={28} height={28} />
              <div>
                <div className="font-bold text-yellow-400 text-sm font-mono">Creator's Lab</div>
                <div className="text-gray-300 text-xs font-mono">Build, test, and monetize your own mini-games</div>
              </div>
              <div className="ml-auto text-yellow-400 text-xs font-bold font-mono">12 online</div>
            </div>
            <div className="flex items-center gap-4 bg-[#141517] border border-yellow-500 rounded-lg p-4 shadow-sm">
              <Image src="/gold-logo.PNG" alt="Logo" width={28} height={28} />
              <div>
                <div className="font-bold text-yellow-400 text-sm font-mono">Fashion Mansion</div>
                <div className="text-gray-300 text-xs font-mono">Design digital wearables and sell them</div>
              </div>
              <div className="ml-auto text-yellow-400 text-xs font-bold font-mono">8 online</div>
            </div>
            <div className="flex items-center gap-4 bg-[#141517] border border-yellow-500 rounded-lg p-4 shadow-sm">
              <Image src="/gold-logo.PNG" alt="Logo" width={28} height={28} />
              <div>
                <div className="font-bold text-yellow-400 text-sm font-mono">Listing Lab</div>
                <div className="text-gray-300 text-xs font-mono">Share virtual tours and get feedback</div>
              </div>
              <div className="ml-auto text-yellow-400 text-xs font-bold font-mono">3 online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Card */}
      <div className="w-full lg:w-[340px] flex-shrink-0 flex flex-col items-center">
        <div className="bg-[#18191c] border-2 border-dashed border-yellow-500 rounded-lg p-10 flex flex-col items-center text-center w-full shadow-lg">
          <Image src="/gold-logo.PNG" alt="Logo" width={48} height={48} className="mb-4" />
          <div className="text-yellow-400 font-bold text-lg mb-2 tracking-wider uppercase font-mono">Welcome to Meta Mansions</div>
          <div className="text-gray-300 text-xs font-mono mb-4">Select a post or app to open it here</div>
        </div>
        <button
          className="mt-12 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg text-sm transition-colors w-full"
          onClick={connectWallet}
        >
          {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
} 