import httpStatus from 'http-status';
import { ApiError } from '../exceptions/api-error';
import { User } from '../models';

export const createUser = async (userBody: any) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

export const queryUsers = async (filter: any, options: any) => {
  const users = await User.paginate(filter, options);
  return users;
};

export const getUserById = async (id: string) => {
  return User.findById(id);
};

export const getUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

export const updateUserById = async (userId: string, updateBody: any) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const res = await User.updateOne({ _id: user.id }, updateBody);
  return res;
};

export const deleteUserById = async (userId: string) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await User.delete({ _id: user.id });
  return user;
};
