"use client";

import { useState } from 'react';

export default function SecurityPrivacyPage() {
  const [selectedMethod, setSelectedMethod] = useState('authenticator');

  return (
    <div className="min-h-screen bg-black flex flex-col px-12 py-10">
      <h1 className="text-2xl font-bold text-white mb-8">Two-factor authentication</h1>
      <div className="max-w-3xl">
        <p className="text-zinc-400 text-base mb-8">
          Secure your account by requiring a verification code when signing in.
        </p>

        <div className="space-y-4">
          {/* Authenticator App Option */}
          <button 
            onClick={() => setSelectedMethod('authenticator')}
            className={`w-full p-4 rounded-lg border ${
              selectedMethod === 'authenticator' 
                ? 'border-[#FFD700] bg-[#FFD700]/10' 
                : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800'
            } transition-all`}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                selectedMethod === 'authenticator' ? 'border-[#FFD700]' : 'border-zinc-600'
              }`}>
                {selectedMethod === 'authenticator' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700]" />
                )}
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-white font-semibold mb-1">Authenticator App (recommended)</h3>
                <p className="text-zinc-400 text-sm">Receive a code via an authenticator app.</p>
              </div>
            </div>
          </button>

          {/* Text Message Option */}
          <button 
            onClick={() => setSelectedMethod('sms')}
            className={`w-full p-4 rounded-lg border ${
              selectedMethod === 'sms' 
                ? 'border-[#FFD700] bg-[#FFD700]/10' 
                : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800'
            } transition-all`}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                selectedMethod === 'sms' ? 'border-[#FFD700]' : 'border-zinc-600'
              }`}>
                {selectedMethod === 'sms' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700]" />
                )}
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-white font-semibold mb-1">Text message</h3>
                <p className="text-zinc-400 text-sm">Receive a code via SMS.</p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8">
          <button className="px-6 py-2 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-[#FFD700]/90 transition-colors">
            Enable two-factor authentication
          </button>
        </div>
      </div>
    </div>
  );
} 