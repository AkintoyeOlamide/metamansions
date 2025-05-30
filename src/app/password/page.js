'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PasswordPage() {
  const [pin, setPin] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to verify the PIN
    // For example, check if pin === '1234' or call an API
    if (pin === '1234') {
      router.push('/dashboard'); // Redirect to dashboard or next page
    } else {
      alert('Invalid PIN. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Enter Your PIN</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <input
          type="password"
          maxLength="4"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded-lg text-white"
          placeholder="Enter 4-digit PIN"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
} 