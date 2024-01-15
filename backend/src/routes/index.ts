import express from 'express';
import AuthRoutes from './auth.routes';

const router = express.Router();

router.use('/', AuthRoutes);

export default router;
