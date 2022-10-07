import { IUser } from '../models/user.model';
import TokenTypes from '../configs/token';
import { TokenService, UserService } from '.';
import { Token } from '../models/token.model';
import { AuthError, NotFoundError } from '../exceptions';

export const register = async (user: IUser) => {
  const _user = await UserService.createUser(user);
  const tokens = await TokenService.generateAuthTokens(_user);
  return { user: _user, tokens };
};

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const user = await UserService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new AuthError('Incorrect email or password');
  }
  const tokens = await TokenService.generateAuthTokens(user);

  return { user, tokens };
};

export const logout = async (refreshToken: string) => {
  const refreshTokenDoc = await Token.findOne({
    where: {
      token: refreshToken,
      type: TokenTypes.REFRESH,
    },
  });
  if (!refreshTokenDoc) {
    throw new NotFoundError('Not found');
  }
  await refreshTokenDoc.destroy();
};

export const refreshAuth = async (refreshToken: string) => {
  try {
    const refreshTokenDoc = await TokenService.verifyToken(
      refreshToken,
      TokenTypes.REFRESH,
    );
    const user = await UserService.getUserById(refreshTokenDoc.userId);
    if (!user) {
      throw new Error('User not found');
    }
    await refreshTokenDoc.destroy();
    return TokenService.generateAuthTokens(user);
  } catch (error) {
    throw new AuthError('Please authenticate');
  }
};

export const resetPassword = async (
  resetPasswordToken: string,
  newPassword: string,
) => {
  try {
    const resetPasswordTokenDoc = await TokenService.verifyToken(
      resetPasswordToken,
      TokenTypes.RESET_PASSWORD,
    );
    const user = await UserService.getUserById(resetPasswordTokenDoc.userId);
    if (!user) {
      throw new Error();
    }
    await UserService.updateUserById(user.id, { password: newPassword });
    await Token.destroy({
      where: {
        userId: user.id,
        type: TokenTypes.RESET_PASSWORD,
      },
    });
  } catch (error) {
    throw new AuthError('Password reset failed');
  }
};

export const verifyEmail = async (verifyEmailToken: string) => {
  try {
    const verifyEmailTokenDoc = await TokenService.verifyToken(
      verifyEmailToken,
      TokenTypes.VERIFY_EMAIL,
    );
    const user = await UserService.getUserById(verifyEmailTokenDoc.userId);
    if (!user) {
      throw new Error();
    }
    await Token.destroy({
      where: {
        userId: user.id,
        type: TokenTypes.VERIFY_EMAIL,
      },
    });
    await UserService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new AuthError('Email verification failed');
  }
};
