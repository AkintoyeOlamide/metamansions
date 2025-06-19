import { NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const adminDb = getFirestore();
const adminAuth = getAuth();

export async function POST(request) {
  try {
    const { email, otp } = await request.json();
    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    const userRef = adminDb.collection('users').doc(email.toLowerCase());
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userData = userDoc.data();
    if (userData.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    // Check if OTP is expired (15 minutes)
    const otpAge = Date.now() - userData.otpCreatedAt;
    if (otpAge > 15 * 60 * 1000) {
      return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
    }

    // Generate a temporary password for authentication
    const temporaryPassword = Math.random().toString(36).slice(-8);

    try {
      // First try to get the user
      try {
        await adminAuth.getUserByEmail(email.toLowerCase());
        // If user exists, update their password
        await adminAuth.updateUser(email.toLowerCase(), {
          password: temporaryPassword
        });
      } catch (userError) {
        // If user doesn't exist, create them
        if (userError.code === 'auth/user-not-found') {
          try {
            await adminAuth.createUser({
              email: email.toLowerCase(),
              password: temporaryPassword
            });
          } catch (createError) {
            // If creation fails due to existing user, try to delete and recreate
            if (createError.code === 'auth/email-already-exists') {
              // Get the user by email and delete them
              const existingUser = await adminAuth.getUserByEmail(email.toLowerCase());
              await adminAuth.deleteUser(existingUser.uid);
              // Now create the user again
              await adminAuth.createUser({
                email: email.toLowerCase(),
                password: temporaryPassword
              });
            } else {
              throw createError;
            }
          }
        } else {
          throw userError;
        }
      }

      // Mark as verified and clear OTP in Firestore
      await userRef.update({
        otpVerified: true,
        otp: '',
      });

      return NextResponse.json({ 
        message: 'OTP verified successfully',
        temporaryPassword,
        redirectTo: `/password-setup?email=${encodeURIComponent(email.toLowerCase())}`
      }, { status: 200 });
    } catch (error) {
      console.error('Auth operation error:', error);
      return NextResponse.json({ error: 'Authentication error: ' + error.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in verify-otp:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error.message }, { status: 500 });
  }
} 