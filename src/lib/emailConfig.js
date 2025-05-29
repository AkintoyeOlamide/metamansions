import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP with hardcoded credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sanitycodes@gmail.com',  // Hardcoded email
    pass: 'tpfk eyle jfem aqgg'     // Hardcoded app password
  }
});

// Store OTPs temporarily (in production, use a proper database)
const otpStore = new Map();

export const storeOTP = (email, otp) => {
  otpStore.set(email, {
    otp,
    createdAt: Date.now()
  });
};

export const verifyOTP = (email, userOtp) => {
  const storedData = otpStore.get(email);
  if (!storedData) return false;

  // Check if OTP is expired (15 minutes validity)
  if (Date.now() - storedData.createdAt > 15 * 60 * 1000) {
    otpStore.delete(email);
    return false;
  }

  if (storedData.otp === userOtp) {
    otpStore.delete(email); // Delete OTP after successful verification
    return true;
  }

  return false;
};

export const sendVerificationEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER ?? 'sanitycodes@gmail.com',
    to: email,
    subject: 'Meta Mansions - Email Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #000; text-align: center;">Welcome to Meta Mansions</h2>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <p style="font-size: 16px;">Your verification code is:</p>
          <h1 style="text-align: center; color: #ffd700; font-size: 36px; letter-spacing: 5px;">${otp}</h1>
          <p style="font-size: 14px; color: #666;">This code will expire in 15 minutes.</p>
        </div>
        <p style="font-size: 14px; color: #666; text-align: center; margin-top: 20px;">
          If you didn't request this code, please ignore this email.
        </p>
      </div>
    `
  };

  try {
    console.log('Attempting to send email with config:', {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER ?? "sanitycodes@gmail.com",
        // pass: process.env.EMAIL_PASS ? '****' : 'not set'
        pass: process.env.EMAIL_PASS ?? "tpfk eyle jfem aqgg"
      }
    });
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Detailed error sending email:', {
      errorName: error.name,
      errorMessage: error.message,
      errorCode: error.code,
      errorCommand: error.command,
      errorResponse: error.response
    });
    return false;
  }
}; 