import jwt from 'jsonwebtoken';

type PayloadType = {
  email: string;
  user_id: string;
};

const createPayload = ({ email, user_id }: PayloadType) => {
  return {
    email,
    user_id,
  };
};

const createAccessToken = (payload: PayloadType, expiresIn: string) => {
  return jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN as string, {
    expiresIn: expiresIn,
  });
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.ACCESS_SECRET_TOKEN as string) as PayloadType;
};

const createRefreshToken = (payload: PayloadType, expiresIn: string) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET_TOKEN as string, {
    expiresIn: expiresIn,
  });
};

const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.REFRESH_SECRET_TOKEN as string) as PayloadType;
  } catch (error) {
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwt.decode(token) as {
      exp: number;
    };
    const expirationDateTimeInSeconds = exp * 1000;
    return Date.now() >= expirationDateTimeInSeconds;
  } catch {
    return true;
  }
};

export {
  createAccessToken,
  createPayload,
  createRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
  isTokenExpired,
  PayloadType,
};
