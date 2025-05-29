"use client";

import { useState } from "react";
import { FaQuestionCircle, FaChevronDown } from "react-icons/fa";
import Link from "next/link";

const FAQS = [
  {
    q: "What is Meta Mansions?",
    a: "A platform where creators can build businesses, sell products, accept payments, and grow communities—all in one place."
  },
  {
    q: "How can I get started with Meta Mansions?",
    a: "Sign up, set up your space, and start creating, selling, and growing in minutes."
  },
  {
    q: "Can I sell physical and digital products on Meta Mansions?",
    a: "Yes, you can sell both physical and digital products."
  },
  {
    q: "How do I accept payments on the platform?",
    a: "Payments are accepted directly through our integrated payment system—no redirects needed."
  },
  {
    q: "What tools does Meta Mansions offer to grow my community?",
    a: "Community management tools, chat, content sharing, and engagement tracking to grow your following."
  },
  {
    q: "Do I need coding skills to use Meta Mansions?",
    a: "No, it's user-friendly and requires no coding skills."
  },
  {
    q: "Can I integrate my social media accounts with Meta Mansions?",
    a: "Yes, you can integrate Instagram, Twitter, and more to promote your products."
  },
  {
    q: "Can I track my sales and performance on Meta Mansions?",
    a: "Yes, you can track sales, audience growth, and performance with our analytics tools."
  }
];

export default function DiscoverPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="relative min-h-screen text-white p-4 bg-black overflow-hidden">
      {/* Animated Gradient Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at 60% 20%, rgba(255,215,0,0.08) 0%, transparent 70%), radial-gradient(ellipse at 20% 80%, rgba(0,212,255,0.07) 0%, transparent 70%)",
          animation: "moveBg 12s ease-in-out infinite alternate"
        }}
      />
      <style>
        {`
          @keyframes moveBg {
            0% { background-position: 60% 20%, 20% 80%; }
            100% { background-position: 65% 25%, 25% 85%; }
          }
        `}
      </style>
      {/* Video with Glow */}
      <div className="flex justify-center mb-4 relative z-10">
        <div className="absolute left-1/2 -translate-x-1/2 top-1 blur-2xl opacity-40 w-[520px] h-[180px] bg-yellow-400 rounded-full" />
        <video
          src="/video-caraousel.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: 800, height: "auto", borderRadius: 12 }}
          className="shadow-lg relative z-10"
        />
      </div>
      {/* Hero Section */}
      <div className="max-w-2xl mx-auto text-center mb-8 relative z-10">
        <h1 className="text-2xl font-bold text-yellow-400 mb-4">
          Launch Your Digital Business in Minutes 💫
        </h1>
        <p className="text-gray-300 text-base mb-8">
          People use Meta Mansions to create, sell, and grow all in one place. Build your community, accept payments, and promote your products with Content Rewards.
        </p>
        {/* Action Buttons and Stats */}
        <div className="flex flex-col items-center w-full mb-10">
          <Link href="/" className="w-full max-w-md">
            <button type="button" className="flex items-center justify-center w-100 bg-yellow-500 hover:bg-yellow-600 text-black text-base font-semibold py-3 rounded-lg mb-3 transition-all cursor-pointer ml-6">
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-5 h-5 mr-2'><path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' /></svg>
              Build Your Mansion
            </button>
          </Link>
          <a href="https://calendly.com/nftbuilds/30min" target="_blank" rel="noopener noreferrer" className="w-full max-w-md">
            <button type="button" className="w-100 bg-gray-900 border border-gray-700 text-white text-base font-normal py-3 rounded-lg mb-6 transition-all cursor-pointer">
              Contact Sales
            </button>
          </a>
          <div className="flex flex-row justify-center gap-16 w-full max-w-2xl">
            <div className="flex flex-col items-center">
              <span className="text-yellow-400 text-lg font-semibold">$118,590,287</span>
              <span className="text-gray-400 text-sm mt-1 tracking-wide">MADE BY PEOPLE</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-yellow-400 text-lg font-semibold">808,694</span>
              <span className="text-gray-400 text-sm mt-1 tracking-wide">USERS ON KEYS METAVERSE</span>
            </div>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-yellow-400 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {FAQS.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#18191c] border border-yellow-500 rounded-lg p-3 text-left transition-all"
              >
                <button
                  className="w-full flex items-center justify-between focus:outline-none"
                  onClick={() => setOpen(open === idx ? null : idx)}
                  aria-expanded={open === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="text-gray-200 text-sm flex items-center gap-2">
                    <FaQuestionCircle className="text-yellow-400 text-sm" />
                    {item.q}
                  </span>
                  <FaChevronDown
                    className={`text-yellow-400 text-xs ml-2 transition-transform duration-200 ${open === idx ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  id={`faq-answer-${idx}`}
                  className={`overflow-hidden transition-all duration-300 text-xs text-gray-300 pl-7 pr-2 ${
                    open === idx ? "max-h-32 mt-2 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  style={{}}
                >
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 