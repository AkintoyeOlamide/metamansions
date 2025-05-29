"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db, storage } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import { onAuthStateChanged } from 'firebase/auth';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.email));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setName(data.name || '');
          setUsername(data.username || '');
          setPreviewUrl(data.profilePicture || '');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [router]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsUploading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        router.push('/');
        return;
      }

      let profilePictureUrl = userData?.profilePicture;

      if (profilePicture) {
        const storageRef = ref(storage, `profile-pictures/${user.email}`);
        const snapshot = await uploadBytes(storageRef, profilePicture);
        profilePictureUrl = await getDownloadURL(snapshot.ref);
      }

      await updateDoc(doc(db, 'users', user.email), {
        name,
        username,
        profilePicture: profilePictureUrl,
      });

      setSuccess('Profile updated successfully!');
      setUserData({ ...userData, name, username, profilePicture: profilePictureUrl });
    } catch (err) {
      setError(err.message || 'Error updating profile');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-yellow-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-yellow-400 mb-2">Settings</h1>
        <p className="text-gray-400 text-sm">Manage your account and preferences</p>
      </div>

      {/* Settings Container */}
      <div className="max-w-4xl mx-auto bg-[#18191c] border border-yellow-500 rounded-lg shadow-xl">
        {/* Tabs */}
        <div className="border-b border-yellow-500">
          <div className="flex">
            <button
              className={`px-6 py-3 text-sm font-semibold focus:outline-none transition-colors ${
                activeTab === 'profile' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`px-6 py-3 text-sm font-semibold focus:outline-none transition-colors ${
                activeTab === 'security' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 text-sm text-green-500 bg-green-500/10 rounded-lg">
                  {success}
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-400">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-yellow-400 font-semibold mb-1">Profile Picture</h3>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="profile-picture"
                  />
                  <label
                    htmlFor="profile-picture"
                    className="text-sm text-yellow-400 hover:text-yellow-500 underline cursor-pointer"
                  >
                    Change Photo
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-yellow-400 text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-yellow-500 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-yellow-400 text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-yellow-500 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-yellow-400 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userData?.email || ''}
                    disabled
                    className="w-full px-3 py-2 bg-black border border-yellow-500 rounded-lg text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <div className="text-gray-300">
              <h3 className="text-yellow-400 font-semibold mb-4">Security Settings</h3>
              {/* Add security settings content */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 