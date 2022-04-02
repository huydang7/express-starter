import userController from './user/user.controller';
import authController from './auth/auth.controller';

import express from 'express';
const router = express.Router();

router.use('/user', userController);
router.use('/auth', authController);

export default router;
