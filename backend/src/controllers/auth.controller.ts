import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';
import createHttpError from 'http-errors';

import User from '../models/user.model';
import Token from '../models/token.model';

import {
  createAccessToken,
  createPayload,
  createRefreshToken,
  isTokenExpired,
  verifyRefreshToken,
} from '../utils/jwt';
import sendEmail from '../utils/sendEmail';

const registerUser = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new createHttpError.Conflict('This email is already exists!');
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  return res.status(StatusCodes.CREATED).json({ user });
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(
      createHttpError.Unauthorized('This email is not exists, make sure you enter right email'),
    );
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(createHttpError.Unauthorized('Wrong password!'));
  }

  if (!user.verified) {
    return next(createHttpError.NotAcceptable('Please verify your email before continue'));
  }

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
    .json({ user, accessToken });
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  res.cookie('userId', null, { expires: new Date(Date.now()) });

  return res
    .status(StatusCodes.OK)
    .cookie('refreshToken', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
    })
    .json({ msg: 'Logout successfully!' });
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.body.refreshToken || req.cookies['refreshToken'];

  if (!refreshToken) {
    throw new createHttpError.BadRequest();
  }

  const userId = verifyRefreshToken(refreshToken);

  let payloadJWT;
  if (userId) {
    const user = await User.findOne({ email: userId.email });

    if (!user) {
      return next(createHttpError.NotFound('User not found'));
    }

    if (!user.verified) {
      return next(createHttpError.NotAcceptable('Please verify your email before continue'));
    }

    payloadJWT = createPayload({
      user_id: userId!.user_id,
      email: userId!.email,
    });
  } else {
    throw new createHttpError.BadRequest('Try login again to continue!!');
  }

  const accessToken = createAccessToken(payloadJWT, process.env.ACCESS_EXPIRES_TIME || '1h');

  const options = {
    expires: new Date(
      Date.now() + (parseInt(process.env.COOKIE_EXPIRES_TIME!) || 1) * 24 * 3600 * 1000,
    ),
    httpOnly: true,
    secure: true,
  };

  res.cookie('userId', userId.user_id, {
    expires: new Date(
      Date.now() + (parseInt(process.env.COOKIE_EXPIRES_TIME!) || 1) * 24 * 3600 * 1000,
    ),
  });

  return res
    .status(StatusCodes.OK)
    .cookie('refreshToken', refreshToken, options)
    .json({ accessToken });
};

const checkRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new createHttpError.BadRequest('Please login to continue!');
  }

  const userId = verifyRefreshToken(refreshToken);
  if (!userId) {
    throw new createHttpError.Forbidden('Try login again to continue');
  }

  const user = await User.findOne({ email: userId.email });

  if (!user) {
    return next(createHttpError.NotFound('User not found'));
  }

  if (!user.verified) {
    return next(createHttpError.NotAcceptable('Please verify your email before continue'));
  }

  if (isTokenExpired(refreshToken)) {
    res.cookie('refreshToken', null, {
      secure: true,
      httpOnly: true,
    });
    res.cookie('userId', null);
    throw new createHttpError.Forbidden('Session expired. Please login again to continue');
  }

  return res.status(StatusCodes.OK).json({ isAuth: true });
};

const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) {
    return next(createHttpError.NotAcceptable('Email is required'));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(createHttpError.NotFound('Not found user'));
  }

  const existToken = await Token.findOne({ email });
  if (existToken) await existToken.deleteOne();

  const resetToken = crypto.randomBytes(20).toString('hex');
  const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  const token = await Token.create({ email, token: resetPasswordToken });

  const link = `${req.headers.origin}/reset-password?e=${email}&token=${resetToken}`;

  try {
    sendEmail({
      email,
      title: 'Reset Password',
      body: `<h1>Reset password request</h1>
      <p>Hi ${user.username},\nYou requested to reset your password</p>
      <p>Please, click the link below to reset your password</p>
      <a href="${link}">Reset password</a>
      <p>This link will be expired after 60 seconds</p>
    `,
    });

    return res.status(StatusCodes.OK).json({ msg: 'Reset link has been sent to your email' });
  } catch (error) {
    console.log(error);
    return next(createHttpError.InternalServerError('Something not wrong, please contact admin'));
  }
};

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { token: resetToken, e: email } = req.query;
  const { password, confirmPassword } = req.body;

  if (!resetToken) {
    return next(createHttpError.NotFound('Reset token is required'));
  }

  if (!password || !confirmPassword) {
    return next(createHttpError.NotAcceptable('Password is required'));
  }

  if (password !== confirmPassword) {
    return next(createHttpError.NotAcceptable('Password does not match'));
  }

  const token = await Token.findOne({ email, token: resetToken });

  if (!token) {
    return next(createHttpError.NotAcceptable('Token is expired'));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(createHttpError.NotFound('User not found'));
  }

  user.password = password;
  await user.save();

  sendEmail({
    email: user.email,
    title: 'Password Reset Successfully',
    body: `<p>Hi ${user.username},</p>
  <p>Your password has been changed successfully</p>`,
  });

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
    .json({ user, accessToken });
};

export {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  checkRefreshToken,
  forgotPassword,
  resetPassword,
};
