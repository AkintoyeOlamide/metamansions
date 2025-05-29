"use client";
export const dynamic = "force-dynamic";

import { Suspense, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signInWithCustomToken } from 'firebase/auth';
import DotsBackground from '@/components/DotsBackground';

function VerifyContent() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryEmail = searchParams.get('email');
    if (!queryEmail) {
      router.push('/signup');
      return;
    }
    setEmail(queryEmail);
    inputRefs[0].current?.focus();
  }, [searchParams, router]);

  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
    const lastFilledIndex = newOtp.findLastIndex(val => val !== '');
    if (lastFilledIndex < 5) {
      inputRefs[lastFilledIndex + 1].current?.focus();
    } else {
      inputRefs[5].current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Verification failed');
        return;
      }
      setMessage('Verification successful! Redirecting...');
      setTimeout(() => {
        router.push(`/profile?email=${email}`);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Verification failed');
    }
  };

  const handleResendCode = async () => {
    setError('');
    setMessage('');
    
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Failed to resend code');
      }

      setMessage('New verification code sent!');
      setOtp(['', '', '', '', '', '']);
      inputRefs[0].current?.focus();
    } catch (err) {
      setError(err.message || 'Failed to resend code');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      <DotsBackground />
      <div className="w-full max-w-sm mx-auto bg-black border border-yellow-600 rounded-xl p-8 flex flex-col items-center shadow-lg relative z-10">
        <Image src="/gold-logo.PNG" alt="Gold Logo" width={40} height={40} className="mb-6" />
        <h2 className="text-xl font-bold text-yellow-400 mb-2">Verify Your Account</h2>
        <p className="text-gray-400 text-sm text-center mb-8">
          We've sent a verification code to {email}
        </p>
        
        {error && (
          <div className="w-full p-3 mb-4 text-sm text-red-500 bg-red-500/10 rounded-lg">
            {error}
          </div>
        )}

        {message && (
          <div className="w-full p-3 mb-4 text-sm text-green-500 bg-green-500/10 rounded-lg">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex gap-2 justify-between mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-bold bg-black border-2 border-gray-700 focus:border-yellow-400 text-yellow-400 rounded-lg focus:outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded transition-colors"
          >
            Verify Account
          </button>
        </form>

        <button
          onClick={handleResendCode}
          className="mt-4 text-gray-400 hover:text-yellow-400 text-sm"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
}

export default function Verify() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
} 