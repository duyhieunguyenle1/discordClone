import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { StatusCodes } from 'http-status-codes';

const authenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers['authorization'] || req.body.token || req.params.token;

  if (!authToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: 'Please login to continue!',
      status: 'failed',
    });
  }

  let accessToken = authToken;
  if (req.headers['authorization']) {
    accessToken = authToken.split(' ')[1];
  }

  const verifiedPayload = verifyAccessToken(accessToken);

  req.user = verifiedPayload;
  next();
};

export { authenticatedUser };
