import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../models/user.model';
import createHttpError from 'http-errors';
import {
  createAccessToken,
  createPayload,
  createRefreshToken,
  isTokenExpired,
  verifyRefreshToken,
} from '../utils/jwt';

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

export { registerUser, loginUser, refreshToken, logoutUser, checkRefreshToken };
