import mongoose, { Schema, Model } from 'mongoose';

import sendEmail from '../utils/sendEmail';
import { IOtp } from '../types/otp.types';

type OtpModel = Model<IOtp, {}>;

const OtpSchema: Schema = new mongoose.Schema<IOtp, OtpModel>({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
    expires: 60 * 1, // The document will be automatically deleted after 1 minutes of its creation time
  },
});

OtpSchema.pre('save', async function (next) {
  if (!this.isNew) {
    next();
  }

  await sendVerificationEmail(this.email, this.otp);
});

async function sendVerificationEmail(email: string, otp: string) {
  try {
    await sendEmail({
      email,
      title: 'Verification Email',
      body: `<h1>Please confirm your OTP</h1>
        <p>Here is your OTP code: ${otp}</p>
        <p>This otp code only lasts 60 seconds</p>
        `,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default mongoose.model<IOtp, OtpModel>('OTP', OtpSchema);
