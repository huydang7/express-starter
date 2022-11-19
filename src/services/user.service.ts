import { getPageSize } from './shared/helper';
import { BadRequest, NotFoundError } from '@exceptions';
import { User } from '@models/user.model';

export const createUser = async (userBody: any) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new BadRequest('email already taken', 100);
  }
  const user = await User.create(userBody);
  return user;
};

export const queryUsers = async (filter: any, options: any) => {
  const users = await User.findAndCountAll({
    where: {
      ...filter,
    },
    ...getPageSize(options),
  });
  return users;
};

export const getUserById = async (id: string) => {
  return User.findByPk(id);
};

export const getUserByEmail = async (email: string) => {
  return User.findOne({ where: { email } });
};

export const updateUserById = async (userId: string, updateBody: any) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new NotFoundError('user not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email))) {
    throw new BadRequest('email already taken', 100);
  }

  const res = await User.update(updateBody, { where: { id: userId } });
  return res;
};

export const deleteUserById = async (userId: string) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new NotFoundError('user not found');
  }
  await User.destroy({ where: { id: userId } });
  return user;
};
