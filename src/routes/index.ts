import express from 'express';

import authController from './auth/auth.controller';
import fileController from './file/file.controller';
import userController from './user/user.controller';

const router = express.Router();

router.use('/user', userController);
router.use('/auth', authController);
router.use('/file', fileController);

export default router;
