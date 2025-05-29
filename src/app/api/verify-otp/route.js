import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function POST(request) {
  try {
    const { email, otp } = await request.json();
    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }
    const userDoc = await getDoc(doc(db, 'users', email.toLowerCase()));
    if (!userDoc.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const userData = userDoc.data();
    if (userData.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }
    // Mark as verified and clear OTP
    await updateDoc(doc(db, 'users', email.toLowerCase()), {
      otpVerified: true,
      otp: '',
    });
    return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error: ' + error.message }, { status: 500 });
  }
} 