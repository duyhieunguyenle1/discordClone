import express from 'express';

import Validator from '../middleware/Validator';

import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from '../controllers/auth.controllers';
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from '../validators/auth.validators';
import { authenticatedUser } from '../middleware/authentication.middlewares';

const router = express.Router();

router.post(
  '/register',
  Validator(registerSchema),
  registerUser,
);

router.post('/login', Validator(loginSchema), loginUser);

router.post('/logout', authenticatedUser, logoutUser);

router.post(
  '/refresh-token',
  Validator(refreshTokenSchema),
  refreshToken,
);

export default router;
