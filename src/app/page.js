"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";
import { FiMail, FiLock } from "react-icons/fi";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import BackgroundEffect from "@/components/BackgroundEffect";
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { SiMetamask } from "react-icons/si";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const actionCodeSettings = {
    url: "http://localhost:3000/finishSignIn", // Change to your deployed URL
    handleCodeInApp: true,
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log(email, password, "cred");
    // return;

    try {
      // Create user with email and password
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;

      // Save user info in Firestore (do NOT save password)
      const res = await setDoc(doc(db, "users", email), {
        email,
        password,
        // otpVerified: false,
        // otp: Math.floor(100000 + Math.random() * 900000).toString(),
        // otpCreatedAt: Date.now(),
      });
      console.log(res, "res_Res");

      // Send OTP via API
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to send verification code");
        return;
      }

      // Redirect to OTP verification page
      router.push(`/verify?email=${encodeURIComponent(email)}`);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else {
        setError(err.message || "Error creating account");
      }
      console.error(err, "error_creating_account");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-transparent relative overflow-hidden">
      <BackgroundEffect />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-8 px-4 py-12 mt-8">
        {/* Left: Info Section */}
        <section className="flex-1 flex flex-col items-center text-center">
          {/* Centered Large Logo */}
          <div className="mb-4 flex justify-center">
            <Image
              src="/gold-logo.PNG"
              alt="Gold Logo"
              width={300}
              height={300}
              className="animate-tilt hover:animate-none transition-all"
            />
          </div>
          <p className="text-gray-300 mb-8 text-xl md:text-2xl font-bold leading-tight">
            Empowering Creators To Succeed
          </p>
        </section>

        {/* Right: Sign Up Card (was Sign In) */}
        <section className="w-full max-w-xs bg-black/40 backdrop-blur-md border border-yellow-600/50 rounded-lg p-6 flex flex-col items-center shadow-lg hover:bg-black/50 transition-all">
          <div className="mb-4 flex items-center">
            <Image
              src="/gold-logo.PNG"
              alt="Gold Logo"
              width={32}
              height={32}
            />
            <span className="ml-2 text-yellow-400 font-bold text-lg">
              Keys Metaverse
            </span>
          </div>
          <p className="text-gray-300 mb-4 text-sm text-center">
            Create an account to discover Meta Mansions and find ways to make
            money.
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
          <form onSubmit={handleSignUp} className="w-full flex flex-col gap-3">
            <div className="w-full">
              <label
                htmlFor="email"
                className="text-gray-200 font-semibold mb-0 text-xs text-left"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="johnappleseed@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded bg-black border border-gray-700 text-gray-200 focus:outline-none focus:border-yellow-400 placeholder-gray-500 italic text-sm"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="password"
                className="text-gray-200 font-semibold mb-0 text-xs text-left"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded bg-black border border-gray-700 text-gray-200 focus:outline-none focus:border-yellow-400 placeholder-gray-500 italic text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded mt-2"
            >
              Continue
            </button>
            <div className="flex items-center my-4 w-full">
              <div className="flex-1 h-px bg-gray-700" />
              <span className="mx-2 text-gray-400 text-xs">or</span>
              <div className="flex-1 h-px bg-gray-700" />
            </div>
            <div className="flex justify-center gap-3 w-full mb-2">
              <button
                className="bg-white border border-gray-300 rounded-lg w-28 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Sign up with MetaMask"
              >
                <Image
                  src="/metmask.png"
                  alt="MetaMask"
                  width={20}
                  height={20}
                />
              </button>
              <button
                className="bg-white border border-gray-300 rounded-lg w-28 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Sign up with Google"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 48 48"
                >
                  <g>
                    <path
                      fill="#4285F4"
                      d="M43.611 20.083H42V20H24v8h11.303C33.973 32.438 29.418 35 24 35c-6.065 0-11-4.935-11-11s4.935-11 11-11c2.507 0 4.805.857 6.627 2.278l6.435-6.435C33.527 6.163 28.977 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20c9.94 0 19.338-7.228 19.338-20 0-1.341-.138-2.359-.338-3.917z"
                    />
                    <path
                      fill="#34A853"
                      d="M6.306 14.691l6.571 4.819C14.655 16.108 19.001 13 24 13c2.507 0 4.805.857 6.627 2.278l6.435-6.435C33.527 6.163 28.977 4 24 4c-7.732 0-14.41 4.41-17.694 10.691z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M24 44c5.356 0 10.236-1.828 13.988-4.965l-6.482-5.307C29.418 35 24 35 24 35c-5.408 0-9.963-2.562-11.303-6.917l-6.571 5.073C9.59 39.59 16.268 44 24 44z"
                    />
                    <path
                      fill="#EA4335"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.13 3.438-5.685 6.917-11.303 6.917-3.13 0-5.963-1.04-8.155-2.819l-6.571 5.073C9.59 39.59 16.268 44 24 44c9.94 0 19.338-7.228 19.338-20 0-1.341-.138-2.359-.338-3.917z"
                    />
                  </g>
                </svg>
              </button>
              <button
                className="bg-white border border-gray-300 rounded-lg w-28 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Sign up with Telegram"
              >
                <FaTelegramPlane className="text-lg text-blue-500" />
              </button>
            </div>
          </form>
          <div className="w-full text-center mt-2 text-gray-500 text-xs">
            By signing in you agree to our
            <br />
            <span className="text-blue-400 cursor-pointer mx-1">
              terms of service
            </span>
            and
            <span className="text-blue-400 cursor-pointer mx-1">
              privacy policy<span className="text-white">.</span>
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
