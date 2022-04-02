import express from 'express';
import httpStatus from 'http-status';
import { auth, requirePermissions } from '../../middlewares/auth';
import {
  AuthService,
  TokenService,
  UserService,
  EmailService,
} from '../../services';
import { catchAsync } from '../../utils';
import * as AuthValidator from './validator';

const router = express.Router();

const register = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body);
  res.formatter(result);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthService.loginUserWithEmailAndPassword(
    email,
    password,
  );

  res.formatter(result);
});

const logout = catchAsync(async (req, res) => {
  await AuthService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).formatter();
});
const getMe = catchAsync(async (req, res) => {
  const user = await UserService.getUserById(req?.user?.id as string);
  res.formatter({ user });
});
const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await AuthService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await TokenService.generateResetPasswordToken(
    req.body.email,
  );
  await EmailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.formatter(true);
});

const resetPassword = catchAsync(async (req, res) => {
  await AuthService.resetPassword(req.query.token as string, req.body.password);
  res.formatter(true);
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await TokenService.generateVerifyEmailToken(
    req.user,
  );
  await EmailService.sendVerificationEmail(
    req?.user?.email as string,
    verifyEmailToken,
  );
  res.formatter(true);
});

const verifyEmail = catchAsync(async (req, res) => {
  await AuthService.verifyEmail(req.query.token as string);
  res.formatter(true);
});

router.post('/register', AuthValidator.validateRegister, register);
router.post('/login', AuthValidator.validateLogin, login);
router.post('/logout', AuthValidator.validateLogout, logout);
router.post(
  '/refresh-tokens',
  AuthValidator.validateRefreshTokens,
  refreshTokens,
);
router.post(
  '/forgot-password',
  AuthValidator.validateForgotPassword,
  forgotPassword,
);
router.post(
  '/reset-password',
  AuthValidator.validateResetPassword,
  resetPassword,
);
router.post('/send-verification-email', auth(), sendVerificationEmail);
router.post('/verify-email', AuthValidator.validateVerifyEmail, verifyEmail);
router.get('/me', auth(), getMe);

export default router;
