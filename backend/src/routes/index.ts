import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import AuthRoutes from './auth.routes';
import UserRoutes from './user.routes';
import FriendRoutes from './friend.routes';
import ServerRoutes from './server.routes';
import options from '../docs';

const router = express.Router();
const specs = swaggerJSDoc(options);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
router.use('/user', UserRoutes);
router.use('/auth', AuthRoutes);
router.use('/friend', FriendRoutes);
router.use('/server', ServerRoutes);

export default router;
