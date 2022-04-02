import express from 'express';
import { Role, RoleRights } from '../configs/roles';
import { auth, requireRoles } from '../middlewares/auth';
import { UserService } from '../services';
import { catchAsync, pick } from '../utils';

const router = express.Router();

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sort', 'limit', 'page']);
  const result = await UserService.queryUsers(filter, options);
  res.formatter({ users: result.docs, count: result.totalDocs });
});

router.get('/', requireRoles([Role.admin]), getUsers);

export default router;
