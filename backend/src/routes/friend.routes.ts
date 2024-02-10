import { Router } from 'express';
import Validator from '../middleware/Validator';
import {
  decideFriendInvitationSchema,
  sendFriendInvitationSchema,
} from '../validators/friend.validators';
import { acceptInvite, rejectInvite, sendInvite } from '../controllers/friend.controller';
import { authenticatedUser } from '../middleware/authentication.middlewares';

const router = Router();

router.post('/invite', authenticatedUser, Validator(sendFriendInvitationSchema), sendInvite);
router.post('/accept', authenticatedUser, Validator(decideFriendInvitationSchema), acceptInvite);
router.post('/reject', authenticatedUser, Validator(decideFriendInvitationSchema), rejectInvite);

export default router;
