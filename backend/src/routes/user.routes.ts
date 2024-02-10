import express from 'express';

import { authenticatedUser } from '../middleware/authentication.middlewares';
import { getAllUsers, getCurrentUser } from '../controllers/user.controller';

const route = express.Router();

route.get('/get-users', authenticatedUser, getAllUsers);
route.get('/current-user', authenticatedUser, getCurrentUser);

export default route;
