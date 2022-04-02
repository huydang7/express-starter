import express from 'express';
import httpStatus from 'http-status';
import { Role } from '../../configs/roles';
import { ApiError } from '../../exceptions/api-error';
import { requireRoles } from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { UserService } from '../../services';
import { catchAsync, pick } from '../../utils';
import * as Validator from './validator';

const router = express.Router();

const createUser = catchAsync(async (req, res) => {
  const user = await UserService.createUser(req.body);
  res.status(httpStatus.CREATED).formatter(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sort', 'limit', 'page']);
  const result = await UserService.queryUsers(filter, options);
  res.formatter({ users: result.docs, count: result.totalDocs });
});

const getUser = catchAsync(async (req, res) => {
  const user = await UserService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
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
  res.status(httpStatus.NO_CONTENT).formatter();
});

router
  .route('/')
  .post(requireRoles([Role.admin]), Validator.createUser, createUser)
  .get(requireRoles([Role.admin]), Validator.getUsers, getUsers)
  .patch(requireRoles([Role.admin]), Validator.updateUser, updateProfile);

router
  .route('/:userId')
  .get(requireRoles([Role.admin]), Validator.getUser, getUser)
  .patch(requireRoles([Role.admin]), Validator.updateUser, updateUser)
  .delete(requireRoles([Role.admin]), Validator.deleteUser, deleteUser);

export default router;
