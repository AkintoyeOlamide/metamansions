"use client";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import DotsBackground from '@/components/DotsBackground';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create user in Firebase Auth and sign them in
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user info in Firestore (do NOT save password)
      await setDoc(doc(db, "users", email), {
        email,
        otpVerified: false,
        otp: Math.floor(100000 + Math.random() * 900000).toString(),
        otpCreatedAt: Date.now(),
      });

      // Send verification email (if you have this logic)
      await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      // Redirect to verification page
      setTimeout(() => {
        router.push(`/verify?email=${email}`);
      }, 700);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else {
        setError(err.message || "Error creating account");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      <DotsBackground />
      <div className="w-full max-w-sm bg-black border border-yellow-600 rounded-xl p-8 flex flex-col items-center shadow-lg relative z-10">
        <h2 className="text-xl font-bold text-yellow-400 mb-6">Sign Up</h2>
        {error && (
          <div className="w-full p-3 mb-4 text-sm text-red-500 bg-red-500/10 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded bg-black border border-gray-700 text-gray-200 focus:outline-none focus:border-yellow-400"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded bg-black border border-gray-700 text-gray-200 focus:outline-none focus:border-yellow-400 pr-10"
              required
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-300"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </span>
          </div>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password *"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 rounded bg-black border border-gray-700 text-gray-200 focus:outline-none focus:border-yellow-400 pr-10"
              required
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-300"
              onClick={() => setShowConfirm((v) => !v)}
            >
              {showConfirm ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded mt-2 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Sending code...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        <div className="w-full text-center mt-4 text-gray-400 text-sm">
          Already have an account? <Link href="/" className="text-yellow-400 hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
} 