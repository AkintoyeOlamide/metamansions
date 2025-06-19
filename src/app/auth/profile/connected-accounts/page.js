import { FaDiscord, FaTelegram, FaInstagram, FaYoutube, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import { SiTradingview } from 'react-icons/si';

const accounts = [
  { label: 'Discord', icon: <FaDiscord className="text-indigo-400" />, },
  { label: 'Telegram', icon: <FaTelegram className="text-blue-400" />, },
  { label: 'TradingView', icon: <SiTradingview className="text-blue-300" />, },
  { label: 'X', icon: <FaXTwitter className="text-white" />, },
  { label: 'Instagram', icon: <FaInstagram className="text-pink-500" />, },
  { label: 'YouTube', icon: <FaYoutube className="text-red-500" />, },
  { label: 'TikTok', icon: <FaTiktok className="text-black dark:text-white" />, },
];

export default function ConnectedAccountsPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col px-12 py-10">
      <h1 className="text-2xl font-bold text-white mb-8">Connected accounts</h1>
      <div className="flex flex-col gap-8">
        {/* Connected accounts section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
          <div className="text-lg font-semibold text-white mb-4">Connected accounts</div>
          <div className="flex items-center justify-center h-32 text-zinc-500 border border-zinc-800 rounded-lg bg-zinc-950">
            No accounts connected yet
          </div>
        </div>
        {/* Add new account section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
          <div className="text-lg font-semibold text-white mb-4">Add new account</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {accounts.map((acc) => (
              <button key={acc.label} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 hover:bg-zinc-800 transition text-white font-semibold text-base">
                <span className="text-2xl">{acc.icon}</span>
                <span>{acc.label}</span>
                <span className="ml-auto text-xl text-zinc-400 font-bold">+</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 