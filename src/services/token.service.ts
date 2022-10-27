import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import env from '../configs/env';
import { UserService } from '.';
import { Token, TokenType } from '../models/token.model';
import { NotFoundError } from '../exceptions';

export const generateToken = (
  data: any,
  expires: Moment,
  type: string,
  secret = env.jwt.secret,
) => {
  const payload = {
    sub: data,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

export const saveToken = async (
  token: string,
  userId: string,
  expires: Moment,
  type: TokenType,
) => {
  return await Token.create({
    token,
    userId: userId,
    expires: expires.format(),
    type,
  });
};

export const verifyToken = async (token: string, type: string) => {
  const payload: any = jwt.verify(token, env.jwt.secret);
  const result = await Token.findOne({
    where: {
      token,
      type,
      userId: payload.sub.id,
    },
  });
  if (!result) {
    throw new Error('Token not found');
  }
  return result;
};

export const generateAuthTokens = async (user: any) => {
  const accessTokenExpires = moment().add(
    env.jwt.accessExpirationMinutes,
    'minutes',
  );
  const accessToken = generateToken(user, accessTokenExpires, TokenType.ACCESS);

  const refreshTokenExpires = moment().add(
    env.jwt.refreshExpirationDays,
    'days',
  );
  const refreshToken = generateToken(
    user,
    refreshTokenExpires,
    TokenType.REFRESH,
  );
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    TokenType.REFRESH,
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

export const generateResetPasswordToken = async (email: string) => {
  const user = await UserService.getUserByEmail(email);
  if (!user) {
    throw new NotFoundError('No users found with this email');
  }
  const expires = moment().add(
    env.jwt.resetPasswordExpirationMinutes,
    'minutes',
  );
  const resetPasswordToken = generateToken(
    user,
    expires,
    TokenType.RESET_PASSWORD,
  );
  await saveToken(
    resetPasswordToken,
    user.id,
    expires,
    TokenType.RESET_PASSWORD,
  );
  return resetPasswordToken;
};

export const generateVerifyEmailToken = async (user: any) => {
  const expires = moment().add(env.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken(user, expires, TokenType.VERIFY_EMAIL);
  await saveToken(verifyEmailToken, user.id, expires, TokenType.VERIFY_EMAIL);
  return verifyEmailToken;
};
