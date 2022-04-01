import jwt from "jsonwebtoken";
import moment, { Moment } from "moment";
import httpStatus from "http-status";

import { Token } from "../models";

import { ApiError } from "../exceptions/api-error";
import config from "../configs/config";
import TokenTypes from "../configs/token";
import { UserService } from ".";

export const generateToken = (
  userId: string,
  expires: Moment,
  type: string,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
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
  blacklisted = false
) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

export const verifyToken = async (token: string, type: string) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

export const generateAuthTokens = async (user: any) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    TokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    TokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    TokenTypes.REFRESH
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
    throw new ApiError(httpStatus.NOT_FOUND, "No users found with this email");
  }
  const expires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    "minutes"
  );
  const resetPasswordToken = generateToken(
    user.id,
    expires,
    TokenTypes.RESET_PASSWORD
  );
  await saveToken(
    resetPasswordToken,
    user.id,
    expires,
    TokenTypes.RESET_PASSWORD
  );
  return resetPasswordToken;
};

export const generateVerifyEmailToken = async (user: any) => {
  const expires = moment().add(
    config.jwt.verifyEmailExpirationMinutes,
    "minutes"
  );
  const verifyEmailToken = generateToken(
    user.id,
    expires,
    TokenTypes.VERIFY_EMAIL
  );
  await saveToken(verifyEmailToken, user.id, expires, TokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};
