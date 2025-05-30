"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db, storage } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import { Suspense } from 'react';
import Link from 'next/link';

const AVATAR_OPTIONS = [
  'https://api.dicebear.com/7.x/bottts/svg?seed=1',
  'https://api.dicebear.com/7.x/bottts/svg?seed=2',
  'https://api.dicebear.com/7.x/bottts/svg?seed=3',
  'https://api.dicebear.com/7.x/bottts/svg?seed=4',
  'https://api.dicebear.com/7.x/bottts/svg?seed=5',
  'https://api.dicebear.com/7.x/bottts/svg?seed=6',
  'https://api.dicebear.com/7.x/bottts/svg?seed=7',
  'https://api.dicebear.com/7.x/bottts/svg?seed=8',
  'https://api.dicebear.com/7.x/bottts/svg?seed=9',
  'https://api.dicebear.com/7.x/bottts/svg?seed=10',
  'https://api.dicebear.com/7.x/bottts/svg?seed=11',
  'https://api.dicebear.com/7.x/bottts/svg?seed=12',
];

function getInitials(name) {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '';
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function ProfilePictureContent() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [name, setName] = useState('');
  const fileInputRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const helpBtnRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const email = searchParams.get('email');
    if (!email) {
      router.push('/signup');
      return;
    }
    // Fetch name for initials
    fetchName(email);
  }, [searchParams, router]);

  useEffect(() => {
    if (!modalOpen) return;
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target) && helpBtnRef.current && !helpBtnRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [modalOpen]);

  const fetchName = async (email) => {
    try {
      const res = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setName(data.name || '');
      }
    } catch {}
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setSelectedAvatar(null);
      setError('');
    }
  };

  const handleAvatarSelect = (avatarPath) => {
    setSelectedAvatar(avatarPath);
    setSelectedImage(null);
    setPreviewUrl(avatarPath);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage && !selectedAvatar) {
      setError('Please select a profile picture or avatar');
      return;
    }
    setIsUploading(true);
    setError('');
    try {
      const email = searchParams.get('email').toLowerCase();
      let profilePictureUrl;
      if (selectedImage) {
        const storageRef = ref(storage, `profile-pictures/${email}`);
        const snapshot = await uploadBytes(storageRef, selectedImage);
        profilePictureUrl = await getDownloadURL(snapshot.ref);
      } else {
        profilePictureUrl = selectedAvatar;
      }
      await updateDoc(doc(db, 'users', email), {
        profilePicture: profilePictureUrl,
        profileSetupComplete: true,
        email,
      }, { merge: true });
      router.push('/user-experience');
    } catch (err) {
      setError(err.message || 'Error saving profile picture');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="absolute top-8 left-0 w-full flex justify-center z-20">
        <Link href="/">
          <Image src="/gold-logo.PNG" alt="Gold Logo" width={40} height={40} />
        </Link>
      </div>
      <div className="w-full max-w-xl flex flex-col items-center justify-center">
        <div className="flex items-center w-full justify-center mb-2" style={{ position: 'relative' }}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center flex-1">Choose your profile picture</h1>
          <button
            ref={helpBtnRef}
            aria-label="Help"
            onClick={() => setModalOpen(true)}
            className="ml-2 p-1 rounded-full border border-white text-xs font-bold focus:outline-none flex items-center justify-center bg-transparent"
            style={{ width: 24, height: 24 }}
          >
            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px', lineHeight: 1 }}>?</span>
          </button>
          {modalOpen && (
            <div
              className="z-50"
              style={{
                position: 'absolute',
                top: helpBtnRef.current ? helpBtnRef.current.offsetTop + helpBtnRef.current.offsetHeight : 0,
                left: helpBtnRef.current ? helpBtnRef.current.offsetLeft + 40 : 40,
                minWidth: '180px',
              }}
            >
              <div ref={modalRef} className="bg-black rounded-lg p-3 relative text-white" style={{ border: '0.5px solid #fff' }}>
                <div className="flex flex-col mt-1">
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
        <p className="text-gray-400 text-base text-center mb-8">Upload your own or choose from one of our default avatars</p>
        {error && (
          <div className="w-full p-3 mb-4 text-sm text-red-500 bg-red-500/10 rounded-lg text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="relative w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-800 mb-2">
              {previewUrl ? (
                previewUrl.endsWith('.svg') || previewUrl.includes('dicebear.com') ? (
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Image
                    src={previewUrl}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                )
              ) : (
                <span className="text-3xl font-bold text-white">{getInitials(name)}</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-black border border-gray-600 hover:bg-gray-900 text-white rounded transition-colors"
            >
              Upload image
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
          </div>
          <hr className="w-full border-t border-gray-700 my-4" />
          <div className="w-full">
            <h2 className="text-lg font-bold text-white mb-1">Keys Metaverse avatars</h2>
            <p className="text-gray-400 text-sm mb-4">Choose from our signature avatars featuring ZIBA</p>
            <div className="grid grid-cols-6 gap-4">
              {AVATAR_OPTIONS.map((avatar, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${
                    selectedAvatar === avatar ? 'border-yellow-400 scale-110' : 'border-gray-700 hover:border-yellow-400/50'
                  }`}
                >
                  <img
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={isUploading || (!selectedImage && !selectedAvatar)}
            className="w-full py-3 rounded bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isUploading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ProfilePicturePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfilePictureContent />
    </Suspense>
  );
} 