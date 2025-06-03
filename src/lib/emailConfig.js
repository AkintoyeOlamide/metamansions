import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sanitycodes@gmail.com',
    pass: 'tpfk eyle jfem aqgg'
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
  // if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  //   console.error('Email configuration missing. Please set EMAIL_USER and EMAIL_PASS environment variables.');
  //   return false;
  // }

  const mailOptions = {
    from: 'sanitycodes@gmail.com',
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
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', email);
    return true;
  } catch (error) {
    console.error('Error sending email:', {
      errorName: error.name,
      errorMessage: error.message,
      errorCode: error.code
    });
    return false;
  }
}; 