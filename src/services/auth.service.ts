import { TokenService, UserService } from '.';
import { AuthError, NotFoundError } from '@exceptions';
import { TokenType } from '@interfaces/token';
import { IUser } from '@interfaces/user';
import { Token } from '@models/token.model';

export const register = async (user: IUser) => {
  const createdUser = await UserService.createUser(user);
  const tokens = await TokenService.generateAuthTokens(createdUser);
  return { user: createdUser, tokens };
};

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const user = await UserService.getUserByEmail(email);
  if (!user || !user.isPasswordMatch(password)) {
    throw new AuthError('incorrect email or password');
  }
  const tokens = await TokenService.generateAuthTokens(user);

  return { user, tokens };
};

export const logout = async (refreshToken: string) => {
  const token = await Token.findOne({
    where: {
      token: refreshToken,
      type: TokenType.REFRESH,
    },
  });
  if (!token) {
    throw new NotFoundError('not found');
  }
  await token.destroy();
};

export const refreshAuth = async (refreshToken: string) => {
  try {
    const token = await TokenService.verifyToken(
      refreshToken,
      TokenType.REFRESH,
    );
    const user = await UserService.getUserById(token.userId);
    if (!user) {
      throw new Error('user not found');
    }
    await token.destroy();
    return TokenService.generateAuthTokens(user);
  } catch (error) {
    throw new AuthError('please authenticate');
  }
};

export const resetPassword = async (
  resetPasswordToken: string,
  newPassword: string,
) => {
  try {
    const token = await TokenService.verifyToken(
      resetPasswordToken,
      TokenType.RESET_PASSWORD,
    );
    const user = await UserService.getUserById(token.userId);
    if (!user) {
      throw new Error('user not found');
    }
    await UserService.updateUserById(user.id, { password: newPassword });
    await Token.destroy({
      where: {
        userId: user.id,
        type: TokenType.RESET_PASSWORD,
      },
    });
  } catch (error) {
    throw new AuthError('password reset failed');
  }
};

export const verifyEmail = async (verifyEmailToken: string) => {
  try {
    const token = await TokenService.verifyToken(
      verifyEmailToken,
      TokenType.VERIFY_EMAIL,
    );
    const user = await UserService.getUserById(token.userId);
    if (!user) {
      throw new Error('user not found');
    }
    await Token.destroy({
      where: {
        userId: user.id,
        type: TokenType.VERIFY_EMAIL,
      },
    });
    await UserService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new AuthError('email verification failed');
  }
};
