import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import config from '../configs/config';
import TokenTypes from '../configs/token';
import { UserService } from '.';
import { Token } from '../models/token.model';
import { NotFoundError } from '../exceptions';

export const generateToken = (
  data: any,
  expires: Moment,
  type: string,
  secret = config.jwt.secret,
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
  type: string,
  blacklisted = false,
) => {
  const tokenDoc = await Token.create({
    token,
    userId: userId,
    expires: expires.format(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

export const verifyToken = async (token: string, type: string) => {
  const payload: any = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({
    where: {
      token,
      type,
      userId: payload.sub.id,
      blacklisted: false,
    },
  });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

export const generateAuthTokens = async (user: any) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes',
  );
  const accessToken = generateToken(
    user,
    accessTokenExpires,
    TokenTypes.ACCESS,
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    'days',
  );
  const refreshToken = generateToken(
    user,
    refreshTokenExpires,
    TokenTypes.REFRESH,
  );
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    TokenTypes.REFRESH,
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
    config.jwt.resetPasswordExpirationMinutes,
    'minutes',
  );
  const resetPasswordToken = generateToken(
    user,
    expires,
    TokenTypes.RESET_PASSWORD,
  );
  await saveToken(
    resetPasswordToken,
    user.id,
    expires,
    TokenTypes.RESET_PASSWORD,
  );
  return resetPasswordToken;
};

export const generateVerifyEmailToken = async (user: any) => {
  const expires = moment().add(
    config.jwt.verifyEmailExpirationMinutes,
    'minutes',
  );
  const verifyEmailToken = generateToken(
    user,
    expires,
    TokenTypes.VERIFY_EMAIL,
  );
  await saveToken(verifyEmailToken, user.id, expires, TokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};
