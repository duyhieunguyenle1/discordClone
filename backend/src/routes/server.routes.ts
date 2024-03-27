import { Router } from 'express';
import { authenticatedUser } from '../middleware/authentication.middlewares';
import Validator from '../middleware/Validator';
import {
  createNewServer,
  getAllServersOfUser,
  getServerByCode,
  getServerById,
} from '../controllers/server.controller';
import { createServerSchema, getServerByCodeSchema } from '../validators/server.validators';

const router = Router();

router.post('/create-new', authenticatedUser, Validator(createServerSchema), createNewServer);

router.get('/findAllServers', authenticatedUser, getAllServersOfUser);

router.get(
  '/findServerByCode',
  authenticatedUser,
  Validator(getServerByCodeSchema),
  getServerByCode,
);

router.get('/findServerById/:id', authenticatedUser, getServerById);

export default router;
