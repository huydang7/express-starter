import express from 'express';
import httpStatus from 'http-status';

import { BaseError } from '@/exceptions/base-error';
import { auth } from '@/middlewares/auth';
import { AuthService, EmailService, TokenService, UserService } from '@/services';
import { catchAsync } from '@/shared/utils';

import * as AuthValidator from './validator';

const router = express.Router();

const register = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body);
  res.formatter(result);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthService.loginUserWithEmailAndPassword(email, password);
  res.formatter(result);
});

const logout = catchAsync(async (req, res) => {
  await AuthService.logout(req.body.refreshToken);
  res.formatter(true);
});

const getMe = catchAsync(async (req, res) => {
  const user = await UserService.getUserById(req?.user?.id as string);
  res.formatter(user);
});

const refreshToken = catchAsync(async (req, res) => {
  const tokens = await AuthService.refreshAuth(req.body.refreshToken);
  res.formatter(tokens);
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await TokenService.generateResetPasswordToken(req.body.email);
  await EmailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.formatter(true);
});

const resetPassword = catchAsync(async (req, res) => {
  await AuthService.resetPassword(req.body.token as string, req.body.password);
  res.formatter(true);
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new BaseError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const verifyEmailToken = await TokenService.generateVerifyEmailToken(req.user);
  await EmailService.sendVerificationEmail(req?.user?.email as string, verifyEmailToken);
  res.formatter(true);
});

const verifyEmail = catchAsync(async (req, res) => {
  await AuthService.verifyEmail(req.body.token as string);
  res.formatter(true);
});

const checkEmailExisted = catchAsync(async (req, res) => {
  const user = await UserService.getUserByEmail(req?.body?.email as string);
  res.formatter(!!user);
});

router.post('/register', AuthValidator.validateRegister, register);
router.post('/login', AuthValidator.validateLogin, login);
router.post('/logout', AuthValidator.validateLogout, logout);
router.post('/refresh-token', AuthValidator.validateRefreshToken, refreshToken);
router.post('/forgot-password', AuthValidator.validateForgotPassword, forgotPassword);
router.post('/reset-password', AuthValidator.validateResetPassword, resetPassword);
router.post('/send-verification-email', auth(), sendVerificationEmail);
router.post('/verify-email', AuthValidator.validateVerifyEmail, verifyEmail);
router.get('/me', auth(), getMe);
router.post('/check-email', checkEmailExisted);

export default router;
