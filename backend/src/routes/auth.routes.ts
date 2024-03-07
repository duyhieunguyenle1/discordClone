import express from 'express';

import Validator from '../middleware/Validator';

import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  checkRefreshToken,
  resetPassword,
  forgotPassword,
} from '../controllers/auth.controller';
import {
  forgotPasswordSchema,
  loginSchema,
  otpVerifySchema,
  refreshTokenSchema,
  registerSchema,
  resetPasswordSchema,
} from '../validators/auth.validators';
import { authenticatedUser } from '../middleware/authentication.middlewares';
import { sendOTP, verifyOTP } from '../controllers/otp.controller';

const router = express.Router();

router.post('/register', Validator(registerSchema), registerUser);

router.post('/login', Validator(loginSchema), loginUser);

router.post('/logout', authenticatedUser, logoutUser);

router.post('/refresh-token', Validator(refreshTokenSchema), refreshToken);

router.get('/isAuthenticated', checkRefreshToken);

router.post('/send-otp', sendOTP);

router.post('/forgot', Validator(forgotPasswordSchema), forgotPassword);

router.put('/reset-password', Validator(resetPasswordSchema), resetPassword);

router.post('/verify-otp', Validator(otpVerifySchema), verifyOTP);

export default router;
