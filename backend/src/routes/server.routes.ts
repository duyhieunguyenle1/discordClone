import { Router } from 'express';
import { authenticatedUser } from '../middleware/authentication.middlewares';
import Validator from '../middleware/Validator';
import { createNewServer, getServerByCode } from '../controllers/server.controller';
import { createServerSchema, getServerByCodeSchema } from '../validators/server.validators';

const router = Router();

router.post('/create-new', authenticatedUser, Validator(createServerSchema), createNewServer);

router.post('/find-server', authenticatedUser, Validator(getServerByCodeSchema), getServerByCode);

export default router;
