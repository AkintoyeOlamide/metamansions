import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }
  const userDoc = await getDoc(doc(db, 'users', email.toLowerCase()));
  if (!userDoc.exists()) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const data = userDoc.data();
  return NextResponse.json({ name: data.name || '' });
} 