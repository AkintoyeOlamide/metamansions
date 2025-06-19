"use client";
import { useState, useEffect } from "react";
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProfileSettings() {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    username: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email.toLowerCase();
        const userDoc = await getDoc(doc(db, 'users', email));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setForm({
            name: data.name || "",
            bio: data.bio || "",
            username: data.username || "",
            email: data.email || email,
            phone: data.phone || "",
          });
        } else {
          setForm(f => ({ ...f, email }));
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <main className="flex-1 flex flex-col px-12 py-10 bg-transparent">
      <h1 className="text-2xl font-bold text-white mb-8">Account settings</h1>
      <form className="max-w-2xl w-full space-y-6">
        <div>
          <label className="block text-zinc-400 text-sm mb-1">Name</label>
          <input
            className="w-full px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-yellow-400 outline-none"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-zinc-400 text-sm mb-1">Bio</label>
          <textarea
            className="w-full px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-yellow-400 outline-none"
            value={form.bio}
            onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
            rows={2}
          />
        </div>
        <div>
          <label className="block text-zinc-400 text-sm mb-1">Username</label>
          <input
            className="w-full px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-yellow-400 outline-none"
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-zinc-400 text-sm mb-1">Email</label>
          <input
            className="w-full px-4 py-2 rounded bg-zinc-900 text-zinc-400 border border-zinc-700 outline-none cursor-not-allowed"
            value={form.email}
            disabled
          />
        </div>
        <div>
          <label className="block text-zinc-400 text-sm mb-1">Phone number</label>
          <input
            className="w-full px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-yellow-400 outline-none"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="No phone number set"
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 rounded bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold text-lg transition"
          >
            Save
          </button>
        </div>
      </form>
    </main>
  );
} 