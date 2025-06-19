"use client";
export const dynamic = "force-dynamic";

import { Suspense, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

function VerifyContent() {
  console.log('VerifyContent component rendering'); // Debug log

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
  const [modalOpen, setModalOpen] = useState(false);
  const helpBtnRef = useRef(null);
  const [modalPos, setModalPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    console.log('VerifyContent useEffect running'); // Debug log
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
    console.log('Submit button clicked - immediate log');
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

      // Sign in with Firebase after successful verification
      try {
        await signInWithEmailAndPassword(auth, email, data.temporaryPassword);
        setMessage('Verification successful! Redirecting to password setup...');
        setTimeout(() => {
          router.push(data.redirectTo);
        }, 1500);
      } catch (authError) {
        console.error('Firebase auth error:', authError);
        setError('Authentication failed. Please try again.');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleResendCode = async () => {
    console.log('Resend code button clicked - immediate log'); // Immediate debug log
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend code');
      }

      setMessage('New verification code sent! Please check your email.');
      setOtp(['', '', '', '', '', '']);
      inputRefs[0].current?.focus();
    } catch (err) {
      console.error('Resend code error:', err);
      setError(err.message || 'Failed to resend code. Please try again.');
    }
  };

  const openModal = () => {
    if (helpBtnRef.current) {
      const rect = helpBtnRef.current.getBoundingClientRect();
      setModalPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      <div className="absolute top-8 left-0 w-full flex justify-center z-20">
        <Image src="/gold-logo.PNG" alt="Gold Logo" width={40} height={40} />
      </div>
      <div className="flex flex-col items-center w-full px-4">
        <div className="flex items-center w-full max-w-3xl mb-2" style={{ position: 'relative' }}>
          <h2 className="text-3xl font-extrabold text-white text-left flex-1">Verify your email</h2>
          <button
            ref={helpBtnRef}
            aria-label="Help"
            onClick={openModal}
            className="ml-2 p-1 rounded-full border border-white text-xs font-bold focus:outline-none flex items-center justify-center shadow bg-transparent"
            style={{ width: 24, height: 24 }}
          >
            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px', lineHeight: 1 }}>?</span>
          </button>
          {/* Modal */}
          {modalOpen && (
            <div
              className="z-50"
              style={{
                position: 'absolute',
                top: helpBtnRef.current ? helpBtnRef.current.offsetTop + helpBtnRef.current.offsetHeight : 0,
                left: helpBtnRef.current ? helpBtnRef.current.offsetLeft : 0,
                minWidth: '180px',
              }}
            >
              <div className="bg-black rounded-lg p-3 relative text-white" style={{ border: '0.5px solid #fff' }}>
                <button
                  className="absolute top-2 right-2 text-white text-xl font-bold focus:outline-none"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close"
                  style={{ background: 'transparent', border: 'none' }}
                >
                  ×
                </button>
                <div className="flex flex-col gap-2 mt-2">
                  <button
                    className="w-full py-2 text-white bg-transparent hover:bg-white/10 rounded text-left"
                    onClick={() => { handleResendCode(); setModalOpen(false); }}
                  >
                    Resend code
                  </button>
                  <button
                    className="w-full py-2 text-white bg-transparent hover:bg-white/10 rounded text-left"
                    onClick={() => { setModalOpen(false); router.push('/signup'); }}
                  >
                    Change email
                  </button>
                  <button
                    className="w-full py-2 text-white bg-transparent hover:bg-white/10 rounded text-left"
                    onClick={() => { setModalOpen(false); window.open('mailto:support@yourdomain.com'); }}
                  >
                    Contact Support
                  </button>
                  <button
                    className="w-full py-2 text-white bg-transparent hover:bg-white/10 rounded text-left"
                    onClick={() => { setModalOpen(false); router.push('/'); }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <p className="text-gray-400 text-sm text-left mb-8 w-full max-w-3xl">
          Keys Metaverse is a password-less platform. You will use this email to login into your account. Please check <span className="font-bold text-white">{email}</span> for your six digit code. Make sure to check spam😉
        </p>
        {error && (
          <div className="w-full max-w-3xl p-3 mb-4 text-sm text-red-500 bg-red-500/10 rounded-lg">
            {error}
          </div>
        )}
        {message && (
          <div className="w-full max-w-3xl p-3 mb-4 text-sm text-green-500 bg-green-500/10 rounded-lg">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full max-w-3xl">
          <div className="flex gap-1 justify-center mb-6">
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
            className="w-64 mx-auto py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded transition-colors"
            style={{ display: 'block' }}
          >
            Verify Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Verify() {
  console.log('Verify component rendering'); // Debug log
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
} 