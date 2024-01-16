import express from 'express';


import {
  // loginUser,
  // logoutUser,
  // refreshToken,
  // registerUser,
  test,
} from '../controllers/auth.controllers';
import {} from // loginSchema,
// refreshTokenSchema,
'../validators/auth.validators';
// import { authenticatedUser } from '../middleware/authentication.middlewares';

const router = express.Router();

// router.post(
//   '/register',
//   Validator(registerSchema),
//   registerUser,
// );

router.get('/test', test);

// router.post('/login', Validator(loginSchema), loginUser);

// router.post('/logout', authenticatedUser, logoutUser);

// router.post(
//   '/refresh-token',
//   Validator(refreshTokenSchema),
//   refreshToken,
// );

export default router;
