import jwt from 'jsonwebtoken';

type PayloadType = {
  email: string;
  user_id: string;
  username: string;
};

const createPayload = ({
  email,
  user_id,
  username,
}: PayloadType) => {
  return {
    email,
    user_id,
    username,
  };
};

const createAccessToken = (
  payload: PayloadType,
  expiresIn: string,
) => {
  return jwt.sign(
    payload,
    process.env.ACCESS_SECRET_TOKEN as string,
    {
      expiresIn: expiresIn,
    },
  );
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(
    token,
    process.env.ACCESS_SECRET_TOKEN as string,
  ) as PayloadType;
};

const createRefreshToken = (
  payload: PayloadType,
  expiresIn: string,
) => {
  return jwt.sign(
    payload,
    process.env.REFRESH_SECRET_TOKEN as string,
    {
      expiresIn: expiresIn,
    },
  );
};

const verifyRefreshToken = (token: string) => {
  return jwt.verify(
    token,
    process.env.REFRESH_SECRET_TOKEN as string,
  ) as PayloadType;
};

export {
  createAccessToken,
  createPayload,
  createRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
  PayloadType,
};
