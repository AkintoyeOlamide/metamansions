"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db, storage } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import { onAuthStateChanged } from 'firebase/auth';
import { FaUser, FaEnvelope, FaUserTag, FaEdit, FaWallet, FaLock, FaAward } from 'react-icons/fa';

const TABS = [
  'PORTFOLIO',
  'ACHIEVEMENTS',
  'ACTIVITY',
  'OFFERS',
  'BADGES',
];

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [walletAddress, setWalletAddress] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);
  const [ethBalance, setEthBalance] = useState(0);
  const [bioEdit, setBioEdit] = useState(false);
  const [bioValue, setBioValue] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('PORTFOLIO'); // Default active tab
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState('https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); // Default cover photo preview (Desert)
  const router = useRouter();

  // Fetch ETH price
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setEthPrice(data.ethereum.usd);
      } catch (err) {
        console.error('Error fetching ETH price:', err);
      }
    };

    fetchEthPrice();
    // Refresh price every minute
    const interval = setInterval(fetchEthPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch wallet balance when wallet is connected
  useEffect(() => {
    const fetchBalance = async () => {
      if (walletAddress && window.ethereum) {
        try {
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [walletAddress, 'latest']
          });
          // Convert balance from wei to ETH
          const ethBalance = parseInt(balance, 16) / Math.pow(10, 18);
          setEthBalance(ethBalance);
        } catch (err) {
          console.error('Error fetching balance:', err);
        }
      }
    };

    fetchBalance();
  }, [walletAddress]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/');
        return;
      }
      try {
        const email = user.email.toLowerCase();
        const userDocRef = doc(db, 'users', email);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setBioValue(data.bio || "Passionate about Meta Mansions and virtual real estate. Building the future of digital living spaces."); // Set initial bio value
          setProfilePicPreview(data.profilePicture || '/profile-placeholder.png'); // Set initial profile pic preview
          setCoverPhotoPreview(data.coverPhoto || 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); // Set initial cover photo preview
          setError('');
        } else {
          setUserData(null);
          setError(`No user document found for: ${email}`);
          setCoverPhotoPreview('https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        }
      } catch (err) {
        setError('Error fetching user data: ' + err.message);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("MetaMask or another Ethereum wallet is not installed.");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
    } catch (err) {
      alert("Wallet connection failed.");
    }
  };

  const handleEditProfile = () => {
    router.push('/auth/settings');
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleProfilePicUpload = async () => {
    if (!profilePicFile || !auth.currentUser) return;
    setIsUploading(true);
    try {
      const userEmail = auth.currentUser.email.toLowerCase();
      const storageRef = ref(storage, `profile-pictures/${userEmail}`);
      const snapshot = await uploadBytes(storageRef, profilePicFile);
      const url = await getDownloadURL(snapshot.ref);
      await updateDoc(doc(db, 'users', userEmail), { profilePicture: url });
      setUserData((prev) => ({ ...prev, profilePicture: url }));
      setProfilePicFile(null);
      setIsUploading(false);
    } catch (err) {
      setIsUploading(false);
      alert('Error uploading profile picture');
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPhotoFile(file);
      setCoverPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverPhotoUpload = async () => {
    if (!coverPhotoFile || !auth.currentUser) return;
    setIsUploading(true);
    try {
      const userEmail = auth.currentUser.email.toLowerCase();
      const storageRef = ref(storage, `cover-photos/${userEmail}`);
      const snapshot = await uploadBytes(storageRef, coverPhotoFile);
      const url = await getDownloadURL(snapshot.ref);
      await updateDoc(doc(db, 'users', userEmail), { coverPhoto: url });
      setUserData((prev) => ({ ...prev, coverPhoto: url }));
      setCoverPhotoFile(null);
      setIsUploading(false);
    } catch (err) {
      setIsUploading(false);
      alert('Error uploading cover photo');
    }
  };

  const handleBioSave = async () => {
    if (!auth.currentUser) return;
    setIsUploading(true);
    try {
      const userEmail = auth.currentUser.email.toLowerCase();
      await updateDoc(doc(db, 'users', userEmail), { bio: bioValue });
      setUserData((prev) => ({ ...prev, bio: bioValue }));
      setBioEdit(false);
      setIsUploading(false);
    } catch (err) {
      setIsUploading(false);
      alert('Error updating bio');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-yellow-400">Loading...</div>
      </div>
    );
  }

  // Placeholder data for stats (as seen in the screenshot structure)
  const stats = [
    { label: 'Properties', value: 12 },
    { label: 'Followers', value: 567 },
    { label: 'Following', value: 234 },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-200 flex ">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10">
        {/* Banner Section */}
        <div className="relative w-full h-48 md:h-64 bg-cover bg-center group" style={{ backgroundImage: `url(${coverPhotoPreview})` }}>
          {/* Cover Photo Edit Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => document.getElementById('cover-photo-upload').click()}>
             <span className="text-white text-lg font-bold">Change Cover Photo</span>
             <input
               id="cover-photo-upload"
               type="file"
               accept="image/*"
               className="hidden"
               onChange={handleCoverPhotoChange}
             />
          </div>

          {coverPhotoFile && (
            <button
              onClick={handleCoverPhotoUpload}
              className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded text-xs border border-black hover:bg-yellow-400 z-20"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Save Cover'}
            </button>
          )}

          {/* Buttons at Top Right */}
          <div className="absolute top-6 right-6 flex gap-4 z-20">
             {/* Edit Profile Button on Banner */}
            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 px-4 py-2 bg-black/70 border border-yellow-500 text-yellow-400 font-bold rounded text-xs shadow hover:bg-yellow-500 hover:text-black transition-all duration-150"
            >
              <FaEdit /> Edit Profile
            </button>
             {/* Connect Wallet Button */}
            <button
              onClick={connectWallet}
              className="flex items-center gap-2 px-4 py-2 bg-black/70 border border-yellow-500 text-yellow-400 font-bold rounded text-xs shadow hover:bg-yellow-500 hover:text-black transition-all duration-150"
            >
              <FaWallet /> {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
            </button>
          </div>

          {/* Overlay for profile pic and info */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-between px-8">
            <div className="flex items-center gap-6">
              {/* Profile Picture */}
              <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white overflow-hidden">
            <Image
                  src={profilePicPreview}
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
                <label htmlFor="profile-pic-upload-banner" className="absolute bottom-0 right-0 bg-yellow-500 p-2 rounded-full border-2 border-black text-black text-xs hover:bg-yellow-400 transition-colors cursor-pointer">
                  <FaEdit />
                  <input
                    id="profile-pic-upload-banner"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </label>
                 {profilePicFile && (
        <button
                    onClick={handleProfilePicUpload}
                    className="absolute top-0 left-full ml-2 bg-yellow-500 text-black px-3 py-1 rounded text-xs border border-black hover:bg-yellow-400"
                    disabled={isUploading}
        >
                    {isUploading ? 'Uploading...' : 'Save'}
        </button>
                )}
              </div>
              {/* Metadata */}
              <div className="text-white text-lg font-semibold flex flex-col">
                <span>{userData?.name || 'No Name Set'}</span>
                <span className="text-sm text-gray-300">@{userData?.username || 'No Username Set'}</span>
                <span className="text-xs text-gray-400 mt-1">{userData?.email || 'No Email Set'}</span>
              </div>
            </div>

             {/* Balance Display */}
             {walletAddress && ethPrice && ( // Only show if wallet is connected and price is fetched
               <div className="flex flex-col items-end text-right text-yellow-400 font-mono text-sm">
                 <span>Balance: {ethBalance.toFixed(4)} ETH</span>
                 <span className="text-yellow-500 ml-2">
                   ≈ ${(ethBalance * ethPrice).toFixed(2)} USD
                 </span>
               </div>
             )}
          </div>
        </div>

        {/* Content Below Banner (Bio, Stats, removed Wallet section) */}
        <div className="relative -mt-12 md:-mt-16 z-10 px-6 w-full">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-6">
            {/* Bio Section */}
            <div className="flex-1 bg-[#18191c] border border-yellow-500 rounded-lg p-6 shadow-xl min-h-[100px]">
              <label className="text-xs text-yellow-500 mb-2 block">Bio</label>
              {bioEdit ? (
                <div className="flex gap-2 items-start">
                  <textarea
                    className="text-white text-sm bg-transparent border border-yellow-500 rounded p-2 flex-1 resize-none"
                    value={bioValue}
                    onChange={e => setBioValue(e.target.value)}
                    rows={3}
                    disabled={isUploading}
                  />
                  <button
                    onClick={handleBioSave}
                    className="bg-yellow-500 text-black px-3 py-1 rounded text-xs border border-black hover:bg-yellow-400"
                    disabled={isUploading}
                  >
                    {isUploading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-white text-sm flex-1">{bioValue}</p>
                  <button
                    onClick={() => setBioEdit(true)}
                    className="bg-yellow-500 text-black px-2 py-1 rounded text-xs border border-black hover:bg-yellow-400"
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
        </div>

            {/* Stats and Wallet (Wallet part removed) */}
            <div className="flex flex-col gap-6 w-full md:w-auto md:min-w-[250px]">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 bg-[#18191c] border border-yellow-500 rounded-lg p-4 text-center shadow-xl">
          {stats.map((stat, i) => (
                  <div key={stat.label}>
              <div className="text-lg font-bold text-yellow-400">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
              {/* Connect Wallet & Balance (Balance part removed) */}
             </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="w-full max-w-7xl mx-auto mt-8 border-b border-yellow-500">
          <div className="flex gap-6">
          {TABS.map(tab => (
            <button
              key={tab}
                className={`pb-3 text-sm font-semibold uppercase tracking-wider transition-colors ${activeTab === tab ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-yellow-300'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full max-w-7xl mx-auto mt-4 rounded-lg p-6 min-h-[200px]">
          {activeTab === 'PORTFOLIO' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder Portfolio Item */}
              <div className="border border-yellow-600 rounded-lg overflow-hidden shadow-lg bg-black/30">
                <div className="w-full h-40 bg-gray-700 flex items-center justify-center text-gray-400 text-sm">Image Placeholder</div>
                <div className="p-4">
                  <div className="font-bold text-yellow-400 text-lg mb-1">Property Title</div>
                  <div className="text-gray-300 text-sm">Location/Description</div>
                  <div className="text-yellow-500 text-xs mt-2">Value: 10 ETH</div>
                </div>
              </div>

              {/* Repeat for more items */}
              <div className="border border-yellow-600 rounded-lg overflow-hidden shadow-lg bg-black/30">
                <div className="w-full h-40 bg-gray-700 flex items-center justify-center text-gray-400 text-sm">Image Placeholder</div>
                <div className="p-4">
                  <div className="font-bold text-yellow-400 text-lg mb-1">Property Title</div>
                  <div className="text-gray-300 text-sm">Location/Description</div>
                  <div className="text-yellow-500 text-xs mt-2">Value: 10 ETH</div>
                </div>
              </div>
               <div className="border border-yellow-600 rounded-lg overflow-hidden shadow-lg bg-black/30">
                <div className="w-full h-40 bg-gray-700 flex items-center justify-center text-gray-400 text-sm">Image Placeholder</div>
                <div className="p-4">
                  <div className="font-bold text-yellow-400 text-lg mb-1">Property Title</div>
                  <div className="text-gray-300 text-sm">Location/Description</div>
                  <div className="text-yellow-500 text-xs mt-2">Value: 10 ETH</div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'ACHIEVEMENTS' && (
            <div className="flex flex-col gap-4">
              {/* Placeholder Achievement Item */}
              <div className="flex items-center gap-4 border border-yellow-600 rounded-lg p-4 bg-[#18191c] shadow-lg">
                <div className="text-yellow-400 text-2xl"><FaUserTag /></div> {/* Using a generic icon */}
                <div>
                  <div className="font-bold text-yellow-400 text-lg mb-1">Early Adopter</div>
                  <div className="text-gray-300 text-sm">Joined the platform in the first month.</div>
                </div>
              </div>
              {/* Placeholder Achievement Item 2 */}
              <div className="flex items-center gap-4 border border-yellow-600 rounded-lg p-4 bg-[#18191c] shadow-lg">
                <div className="text-yellow-400 text-2xl"><FaWallet /></div> {/* Using a generic icon */}
                <div>
                  <div className="font-bold text-yellow-400 text-lg mb-1">First Property Owner</div>
                  <div className="text-gray-300 text-sm">Acquired your first digital property.</div>
                </div>
              </div>
              {/* Placeholder Achievement Item 3 */}
               <div className="flex items-center gap-4 border border-yellow-600 rounded-lg p-4 bg-[#18191c] shadow-lg">
                <div className="text-yellow-400 text-2xl"><FaUser /></div> {/* Using a generic icon */}
                <div>
                  <div className="font-bold text-yellow-400 text-lg mb-1">Community Contributor</div>
                  <div className="text-gray-300 text-sm">Made valuable contributions to the community forum.</div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'ACTIVITY' && (
            <div className="flex flex-col gap-4">
              {/* Placeholder Activity Item */}
              <div className="border border-yellow-600 rounded-lg p-4 bg-[#18191c] shadow-lg">
                <div className="text-gray-300 text-sm mb-1">You updated your profile picture.</div>
                <div className="text-gray-500 text-xs">2 hours ago</div>
              </div>
              {/* Placeholder Activity Item 2 */}
              <div className="border border-yellow-600 rounded-lg p-4 bg-[#18191c] shadow-lg">
                <div className="text-gray-300 text-sm mb-1">You connected your wallet.</div>
                <div className="text-gray-500 text-xs">1 day ago</div>
              </div>
              {/* Placeholder Activity Item 3 */}
               <div className="border border-yellow-600 rounded-lg p-4 bg-[#18191c] shadow-lg">
                <div className="text-gray-300 text-sm mb-1">You updated your bio.</div>
                <div className="text-gray-500 text-xs">3 days ago</div>
              </div>
            </div>
          )}
          {activeTab === 'OFFERS' && (
            <div className="flex flex-col gap-4">
              {/* Placeholder Offer Item */}
              <div className="border border-yellow-600 rounded-lg p-4 bg-[#18191c] shadow-lg">
                <div className="font-bold text-yellow-400 text-lg mb-1">Offer from User X</div>
                <div className="text-gray-300 text-sm mb-2">Offering 5 ETH for Property Title Y.</div>
                <div className="text-yellow-500 text-xs">Status: Pending</div>
              </div>
              {/* Placeholder Offer Item 2 */}
              <div className="border border-yellow-600 rounded-lg p-4 bg-[#18191c] shadow-lg">
                <div className="font-bold text-yellow-400 text-lg mb-1">Offer from User Z</div>
                <div className="text-gray-300 text-sm mb-2">Offering to trade Asset A for Asset B.</div>
                <div className="text-green-500 text-xs">Status: Accepted</div>
              </div>
            </div>
          )}
          {activeTab === 'BADGES' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Placeholder Badge Item */}
              <div className="flex flex-col items-center gap-2 border border-yellow-600 rounded-lg p-4 bg-[#18191c] shadow-lg">
                <div className="text-yellow-400 text-4xl"><FaAward /></div> {/* Using FaAward icon */}
                <div className="text-yellow-400 text-sm font-semibold text-center">Beta Tester</div>
              </div>
              {/* Placeholder Badge Item 2 */}
              <div className="flex flex-col items-center gap-2 border border-yellow-600 rounded-lg p-4 bg-[#18191c] shadow-lg">
                <div className="text-yellow-400 text-4xl"><FaAward /></div> {/* Using FaAward icon */}
                <div className="text-yellow-400 text-sm font-semibold text-center">Community Guru</div>
              </div>
               {/* Placeholder Badge Item 3 */}
              <div className="flex flex-col items-center gap-2 border border-yellow-600 rounded-lg p-4 bg-[#18191c] shadow-lg">
                <div className="text-yellow-400 text-4xl"><FaAward /></div> {/* Using FaAward icon */}
                <div className="text-yellow-400 text-sm font-semibold text-center">Property Tycoon</div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 