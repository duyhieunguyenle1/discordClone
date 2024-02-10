import express from 'express';

import AuthRoutes from './auth.routes';
import UserRoutes from './user.routes';
import FriendRoutes from './friend.routes';

const router = express.Router();

router.use('/user', UserRoutes);
router.use('/auth', AuthRoutes);
router.use('/friend', FriendRoutes);

export default router;
