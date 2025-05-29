"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db, storage } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import DotsBackground from '@/components/DotsBackground';
import Image from 'next/image';
import { Suspense } from 'react';

const AVATAR_OPTIONS = [
  '/avatars/bot1.png',
  '/avatars/bot2.png',
  '/avatars/bot3.png',
  '/avatars/bot4.png',
  '/avatars/bot5.png',
  '/avatars/bot6.png',
];

function ProfilePictureContent() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const fileInputRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = searchParams.get('email');
    if (!email) {
      router.push('/signup');
    }
  }, [searchParams, router]);

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
        // Upload custom image
        const storageRef = ref(storage, `profile-pictures/${email}`);
        const snapshot = await uploadBytes(storageRef, selectedImage);
        profilePictureUrl = await getDownloadURL(snapshot.ref);
      } else {
        // Use selected avatar
        profilePictureUrl = selectedAvatar;
      }

      // Update user document with the image URL
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
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      <DotsBackground />
      <div className="w-full max-w-sm bg-black border border-yellow-600 rounded-xl p-8 flex flex-col items-center shadow-lg relative z-10">
        <h2 className="text-xl font-bold text-yellow-400 mb-6">Add Profile Picture</h2>
        {error && (
          <div className="w-full p-3 mb-4 text-sm text-red-500 bg-red-500/10 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-yellow-400">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Profile preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>

          <div className="w-full">
            <h3 className="text-yellow-400 text-sm mb-3">Choose an Avatar</h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {AVATAR_OPTIONS.map((avatar, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${
                    selectedAvatar === avatar ? 'border-yellow-400 scale-110' : 'border-gray-700 hover:border-yellow-400/50'
                  }`}
                >
                  <Image
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-yellow-400 text-sm mb-3">Or Upload Your Own</h3>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-yellow-400 rounded-lg transition-colors"
            >
              Choose Image
            </button>
          </div>

          <button
            type="submit"
            disabled={isUploading || (!selectedImage && !selectedAvatar)}
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Saving...' : 'Save Profile Picture'}
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