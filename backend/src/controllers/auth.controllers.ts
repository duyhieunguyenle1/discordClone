import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import asyncWrapper from '../utils/catchAsyncError';
import User from '../models/user.model';
import createHttpError from 'http-errors';
import {
  createAccessToken,
  createPayload,
  createRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt';
import CustomErrorAPI from '../handlers/error.handler';

const registerUser = async (
  req: Request,
  res: Response,
) => {
  const { email, username, password } = req.body;

  const isUserExist = await User.findOne({ email });
  console.log(isUserExist);

  if (isUserExist) {
    throw new CustomErrorAPI(
      'This email is already exists!',
      403,
    );
    // throw new createHttpError.Conflict('This email is already exists!');
    // return res.status(StatusCodes.FORBIDDEN).json({messgae:'This email is already exists!'})
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const payloadJWT = createPayload({
    email,
    user_id: user._id,
    username,
  });
  const accessToken = createAccessToken(
    payloadJWT,
    process.env.ACCESS_EXPIRES_TIME || '1h',
  );
  const refreshToken = createRefreshToken(
    payloadJWT,
    process.env.REFRESH_EXPIRES_TIME || '1d',
  );

  const options = {
    expires: new Date(
      Date.now() +
        (parseInt(process.env.COOKIE_EXPIRES_TIME!) || 1) *
          24 *
          3600 *
          1000,
    ),
    httpOnly: true,
    secure: true,
  };

  return res
    .status(StatusCodes.CREATED)
    .cookie('refreshToken', refreshToken, options)
    .json({ user: payloadJWT, accessToken });
};

const loginUser = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(
        createHttpError.Unauthorized(
          'This email is not exists, make sure you enter right email',
        ),
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(
        createHttpError.Unauthorized('Wrong password!'),
      );
    }

    const payloadJWT = createPayload({
      username: user.username,
      user_id: user._id,
      email: user.email,
    });

    const accessToken = createAccessToken(
      payloadJWT,
      process.env.ACCESS_EXPIRES_TIME || '1h',
    );
    const refreshToken = createRefreshToken(
      payloadJWT,
      process.env.REFRESH_EXPIRES_TIME || '1d',
    );

    const options = {
      expires: new Date(
        Date.now() +
          (parseInt(process.env.COOKIE_EXPIRES_TIME!) ||
            1) *
            24 *
            3600 *
            1000,
      ),
      httpOnly: true,
      secure: true,
    };

    return res
      .status(StatusCodes.OK)
      .cookie('refreshToken', refreshToken, options)
      .json({ user, accessToken });
  },
);

const logoutUser = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    return res
      .status(StatusCodes.OK)
      .cookie('refreshToken', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
      })
      .json({ msg: 'Logout successfully!' });
  },
);

const refreshToken = asyncWrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const refreshToken =
      req.body.refreshToken ||
      req.headers.cookie?.split('=')[1];

    if (!refreshToken) {
      next(createHttpError.BadRequest());
    }

    const userId = verifyRefreshToken(refreshToken);
    const payloadJWT = createPayload({
      username: userId.username,
      user_id: userId.user_id,
      email: userId.email,
    });

    const accessToken = createAccessToken(
      payloadJWT,
      process.env.ACCESS_EXPIRES_TIME || '1h',
    );

    const options = {
      expires: new Date(
        Date.now() +
          (parseInt(process.env.COOKIE_EXPIRES_TIME!) ||
            1) *
            24 *
            3600 *
            1000,
      ),
      httpOnly: true,
      secure: true,
    };

    return res
      .status(StatusCodes.OK)
      .cookie('refreshToken', refreshToken, options)
      .json({ accessToken });
  },
);

export {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
};
