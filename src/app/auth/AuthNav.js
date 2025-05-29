import { FaHome, FaUser, FaCubes, FaShoppingCart, FaGamepad, FaUserTie, FaUsers, FaWallet, FaCog } from 'react-icons/fa';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Home', icon: <FaHome />, href: '/auth' },
  { label: 'Profile', icon: <FaUser />, href: '/auth/profile' },
  { label: 'Build', icon: <FaCubes />, href: '/auth/build' },
  { label: 'Shop', icon: <FaShoppingCart />, href: '/auth/shop' },
  { label: 'Play', icon: <FaGamepad />, href: '/auth/play' },
  { label: 'Agent', icon: <FaUserTie />, href: '/auth/agent' },
  { label: 'Friends', icon: <FaUsers />, href: '/auth/friends' },
  { label: 'Wallet', icon: <FaWallet />, href: '/auth/wallet' },
  { label: 'Settings', icon: <FaCog />, href: '/auth/settings' },
];

export default function AuthNav() {
  return (
    <nav className="w-full bg-black border-b border-yellow-600 flex justify-center py-2 shadow-lg z-20">
      <ul className="flex gap-6">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="flex flex-col items-center text-yellow-400 hover:text-yellow-300 transition-colors px-2"
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-semibold tracking-wide">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
} 