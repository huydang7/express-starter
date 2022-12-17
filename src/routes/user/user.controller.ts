import * as Validator from './validator';
import { Role } from 'configs/roles';
import { NotFoundError } from 'exceptions';
import express from 'express';
import { auth, requireRoles } from 'middlewares/auth';
import { UserService } from 'services';
import { catchAsync, pick } from 'shared/utils';

const router = express.Router();

const createUser = catchAsync(async (req, res) => {
  const user = await UserService.createUser(req.body);
  res.formatter(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['order', 'size', 'page']);
  const result = await UserService.queryUsers(filter, options);
  res.formatter(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await UserService.getUserById(req.params.userId);
  if (!user) {
    throw new NotFoundError('user not found');
  }
  res.formatter(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await UserService.updateUserById(req.params.userId, req.body);
  res.formatter(user);
});

const updateProfile = catchAsync(async (req, res) => {
  const user = await UserService.updateUserById(
    req?.user?.id as string,
    req.body,
  );
  res.formatter(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await UserService.deleteUserById(req.params.userId);
  res.formatter(true);
});

router
  .route('/')
  .post(requireRoles([Role.ADMIN]), Validator.createUser, createUser)
  .get(requireRoles([Role.ADMIN]), Validator.getUsers, getUsers)
  .patch(auth(), Validator.updateProfile, updateProfile);

router
  .route('/:id')
  .get(requireRoles([Role.ADMIN]), Validator.getUser, getUser)
  .patch(requireRoles([Role.ADMIN]), Validator.updateUser, updateUser)
  .delete(requireRoles([Role.ADMIN]), Validator.getUser, deleteUser);

export default router;
