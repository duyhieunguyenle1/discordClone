import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import otpGenerator from 'otp-generator';

import User from '../models/user.model';
import OTP from '../models/otp.model';
import { StatusCodes } from 'http-status-codes';
import { createAccessToken, createPayload, createRefreshToken } from '../utils/jwt';

const sendOTP = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email || req.query.e;

  if (!email) {
    return next(createHttpError.NotFound('Email is required'));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(createHttpError.NotFound('Please sign up first'));
  }

  if (user.verified) {
    return next(createHttpError.BadRequest('User is already verified'));
  }

  let otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });

  let result = await OTP.findOne({ otp });
  while (result) {
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
  }

  const otpBody = await OTP.create({ email, otp });

  return res.status(StatusCodes.OK).json({ msg: 'Otp is resend successfully' });
};

const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.query.e;
  const { otp: otpInput } = req.body;

  if (!email) {
    return next(createHttpError.NotFound('Email is required'));
  }

  if (!otpInput) {
    return next(createHttpError.NotFound('Otp is required'));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(createHttpError.NotFound('Please sign up first'));
  }

  if (user.verified) {
    return next(createHttpError.BadRequest('User is already verified'));
  }

  const otp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

  if (otp.length == 0 || otp[0].otp !== otpInput) {
    return next(createHttpError.BadRequest('Please enter right OTP provided in your email'));
  }

  user.verified = true;
  await user.save();

  const payloadJWT = createPayload({
    user_id: user._id,
    email: user.email,
  });

  const accessToken = createAccessToken(payloadJWT, process.env.ACCESS_EXPIRES_TIME || '1h');
  const refreshToken = createRefreshToken(payloadJWT, process.env.REFRESH_EXPIRES_TIME || '1d');

  const options = {
    expires: new Date(
      Date.now() + (parseInt(process.env.COOKIE_EXPIRES_TIME!) || 1) * 24 * 3600 * 1000,
    ),
    httpOnly: true,
    secure: true,
  };

  res.cookie('userId', user._id, {
    expires: new Date(
      Date.now() + (parseInt(process.env.COOKIE_EXPIRES_TIME!) || 1) * 24 * 3600 * 1000,
    ),
  });

  return res
    .status(StatusCodes.OK)
    .cookie('refreshToken', refreshToken, options)
    .json({ msg: 'Login successfully', accessToken });
};

export { sendOTP, verifyOTP };
