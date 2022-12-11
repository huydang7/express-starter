import { UserService } from '.';
import env from 'configs/env';
import { NotFoundError } from 'exceptions';
import { TokenType } from 'interfaces/token';
import { IUser } from 'interfaces/user';
import jwt from 'jsonwebtoken';
import { Token } from 'models/token.model';
import moment, { Moment } from 'moment';

export const generateToken = (
  data: any,
  expires: Moment,
  type: TokenType,
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

export const verifyToken = async (token: string, type: TokenType) => {
  const payload: any = jwt.verify(token, env.jwt.secret);
  const result = await Token.findOne({
    where: {
      token,
      type,
      userId: payload.sub.id,
    },
  });
  if (!result) {
    throw new Error('token not found');
  }
  return result;
};

export const generateAuthTokens = async (user: IUser) => {
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
    throw new NotFoundError('no users found with this email');
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

export const generateVerifyEmailToken = async (user: IUser) => {
  const expires = moment().add(env.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken(user, expires, TokenType.VERIFY_EMAIL);
  await saveToken(verifyEmailToken, user.id, expires, TokenType.VERIFY_EMAIL);
  return verifyEmailToken;
};
