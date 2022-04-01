import { IUser } from "../models/user.model";
import httpStatus from "http-status";
import { Token } from "../models";
import { ApiError } from "../exceptions/api-error";
import TokenTypes from "../configs/token";
import { TokenService, UserService } from ".";

export const register = async (user: IUser) => {
  const _user = await UserService.createUser(user);
  const tokens = await TokenService.generateAuthTokens(_user);
  return { user: _user, tokens };
};

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await UserService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  const tokens = await TokenService.generateAuthTokens(user);

  return { user, tokens };
};

export const logout = async (refreshToken: string) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: TokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await refreshTokenDoc.remove();
};

export const refreshAuth = async (refreshToken: string) => {
  try {
    const refreshTokenDoc = await TokenService.verifyToken(
      refreshToken,
      TokenTypes.REFRESH
    );
    const user = await UserService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return TokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

export const resetPassword = async (
  resetPasswordToken: string,
  newPassword: string
) => {
  try {
    const resetPasswordTokenDoc = await TokenService.verifyToken(
      resetPasswordToken,
      TokenTypes.RESET_PASSWORD
    );
    const user = await UserService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await UserService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: TokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
  }
};

export const verifyEmail = async (verifyEmailToken: string) => {
  try {
    const verifyEmailTokenDoc = await TokenService.verifyToken(
      verifyEmailToken,
      TokenTypes.VERIFY_EMAIL
    );
    const user = await UserService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: TokenTypes.VERIFY_EMAIL });
    await UserService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed");
  }
};
