import express from 'express';

import { authenticatedUser } from '../middleware/authentication.middlewares';
import {
  getAllFriendsNotInServer,
  getAllUsers,
  getCurrentUser,
  getUserById,
} from '../controllers/user.controller';
import Validator from '../middleware/Validator';
import { getAllFriendsSchema } from '../validators/user.validators';

const router = express.Router();

router.get('/get-users', authenticatedUser, getAllUsers);
router.get('/current-user', authenticatedUser, getCurrentUser);
router.get('/get-user/:id', authenticatedUser, getUserById);
router.post(
  '/getFriends-notInServer',
  authenticatedUser,
  Validator(getAllFriendsSchema),
  getAllFriendsNotInServer,
);

export default router;
