import { NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/lib/emailConfig';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', otp); // For testing purposes
    console.log('Received signup request for email:', email);
    
    // Store OTP and verification status in Firestore
    await setDoc(doc(db, 'users', email.toLowerCase()), {
      otp,
      otpVerified: false,
      otpCreatedAt: Date.now(),
    }, { merge: true });
    console.log('User doc created for:', email.toLowerCase());

    // Send email
    const emailSent = await sendVerificationEmail(email, otp);

    if (!emailSent) {
      console.error('Failed to send email to:', email);
      return NextResponse.json(
        { error: 'Failed to send verification email. Please check server logs.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Verification email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Detailed error in send-otp route:', {
      error: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
} 