"use client";
import Link from 'next/link';

const legalLinks = [
  { label: 'Terms of Services', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Community Guidelines', href: '#' },
  { label: 'FTC Guidelines', href: '#' },
  { label: 'Content Rewards Terms of Service', href: '#' },
  { label: 'Youth Safety Policy', href: '#' },
  { label: 'Splitit Terms', href: '#' },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-12 pt-10">
        <div className="flex items-center gap-2">
          <span className="bg-yellow-400 rounded p-1">
            <img src="/gold-logo.PNG" alt="Keys Logo" width={40} height={40} />
          </span>
          <span className="font-extrabold text-2xl text-black tracking-tight">Keys</span>
        </div>
        <a href="/" className="text-gray-500 font-semibold hover:underline">Go to Keys</a>
      </div>
      {/* Main Content */}
      <main className="flex flex-1 w-full max-w-6xl mx-auto pt-12">
        {/* Left: Legal Menu */}
        <aside className="w-1/3 pr-12 flex flex-col items-start">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-10">Legal</h1>
          <nav className="flex flex-col gap-2 w-full">
            {legalLinks.map(link => (
              <Link key={link.label} href={link.href} className={`text-lg font-semibold ${link.label === 'Terms of Services' ? 'text-black' : 'text-gray-400 font-normal'}`}>{link.label}</Link>
            ))}
          </nav>
        </aside>
        {/* Right: Terms Content */}
        <section className="flex-1">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Terms of Service</h2>
          <div className="text-gray-600 space-y-4 max-w-2xl">
            <p>Thank you for your interest in Keys, Inc. (<b>"Keys," "we," or "us"</b>) and our website at <a href="#" className="underline">www.keys.com</a>, along with our related websites, hosted applications, mobile or other downloadable applications, and other services provided by us (collectively, the <b>"Service"</b>). These Terms of Service are a legally binding contract between you and Keys regarding your use of the Service.</p>
            <h3 className="font-bold text-gray-700 mt-6">PLEASE READ THE FOLLOWING TERMS CAREFULLY</h3>
            <p><b>BY CLICKING "I ACCEPT," OR BY DOWNLOADING, INSTALLING, OR OTHERWISE ACCESSING OR USING THE SERVICE,</b> YOU AGREE THAT YOU HAVE READ AND UNDERSTOOD, AND, AS A CONDITION TO YOUR USE OF THE SERVICE, YOU AGREE TO BE BOUND BY, THE FOLLOWING TERMS AND CONDITIONS, INCLUDING KEYS'S <a href="#" className="underline">PRIVACY POLICY</a> AND OTHER POLICIES REFERENCED BELOW (TOGETHER, THESE <b>"TERMS"</b>). IF YOU ARE NOT ELIGIBLE, OR DO NOT AGREE TO THE TERMS, THEN YOU DO NOT HAVE OUR PERMISSION TO USE THE SERVICE. YOUR USE OF THE SERVICE, AND KEYS'S PROVISION OF THE SERVICE TO YOU, CONSTITUTES AN AGREEMENT BY KEYS AND YOU TO BE BOUND BY THESE TERMS.</p>
            <h3 className="font-bold text-gray-700 mt-6">ARBITRATION NOTICE</h3>
            <p>Except for certain kinds of disputes described in Section 18, you agree that disputes arising under these Terms will be resolved by binding, individual arbitration, and BY ACCEPTING THESE TERMS, YOU AND KEYS ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN ANY CLASS ACTION OR REPRESENTATIVE PROCEEDING.</p>
          </div>
        </section>
      </main>
    </div>
  );
} 