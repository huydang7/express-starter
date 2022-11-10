import authController from './auth/auth.controller';
import fileController from './file/file.controller';
import sampleController from './sample/sample.controller';
import userController from './user/user.controller';
import express from 'express';

const router = express.Router();

router.use('/user', userController);
router.use('/auth', authController);
router.use('/file', fileController);
router.use('/sample', sampleController);

export default router;
