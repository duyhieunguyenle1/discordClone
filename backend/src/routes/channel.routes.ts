import { Router } from 'express';
import { authenticatedUser } from '../middleware/authentication.middlewares';
import Validator from '../middleware/Validator';
import { getAllChannelsOfServer, getChannelOfServer } from '../controllers/channel.controller';

const router = Router();

router.get('/getChannelsOfServer/:id', authenticatedUser, getAllChannelsOfServer);
router.get('/getChannelOfServer/:id1/:id2', authenticatedUser, getChannelOfServer);

export default router;
