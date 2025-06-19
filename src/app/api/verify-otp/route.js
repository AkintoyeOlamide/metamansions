import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, getApps, cert } from "firebase-admin/app";

// // Initialize Firebase Admin if not already initialized
// if (!getApps().length) {
//   initializeApp({
//     credential: cert({
//       projectId: process.env.FIREBASE_PROJECT_ID || "",
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
//     }),
//   });
// }

export async function POST(request) {
  try {
    const { email, otp } = await request.json();
    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const userDoc = await getDoc(doc(db, "users", email.toLowerCase()));
    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    if (userData.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Generate a temporary password for authentication
    // const temporaryPassword = Math.random().toString(36).slice(-8);

    // Update user's password in Firebase Auth
    // try {
    //   await getAuth().updateUser(email.toLowerCase(), {
    //     password: temporaryPassword,
    //   });
    // } catch (error) {
    //   // If user doesn't exist in Auth, create them
    //   if (error.code === "auth/user-not-found") {
    //     await getAuth().createUser({
    //       email: email.toLowerCase(),
    //       password: temporaryPassword,
    //     });
    //   } else {
    //     throw error;
    //   }
    // }

    // Mark as verified and clear OTP in Firestore
    await updateDoc(doc(db, "users", email.toLowerCase()), {
      otpVerified: true,
      otp: "",
    });

    return NextResponse.json(
      {
        message: "OTP verified successfully",
        // temporaryPassword,
        redirectTo: `/profile?email=${encodeURIComponent(email.toLowerCase())}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in verify-otp:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}
