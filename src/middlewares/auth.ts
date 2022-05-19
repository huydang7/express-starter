import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { AllRoles, Role, RoleRights } from '../configs/roles';
import { AuthError, ForbiddenError } from '../exceptions';

const verifyPermissionCallback =
  (
    req: Request,
    resolve: any,
    reject: any,
    requiredRights: RoleRights[],
    options: {
      optional?: boolean;
    } = {},
  ) =>
  async (err: any, user: any, info: any) => {
    if (!options.optional && (err || info || !user)) {
      return reject(new AuthError('Please authenticate'));
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = AllRoles[user.role as Role] || [];
      const hasRequiredRights = requiredRights.every(
        (requiredRight: RoleRights) => userRights.includes(requiredRight),
      );
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ForbiddenError('Forbidden'));
      }
    }

    resolve();
  };

const verifyRoleCallback =
  (
    req: Request,
    resolve: any,
    reject: any,
    roles: Role[],
    options: {
      optional?: boolean;
    } = {},
  ) =>
  async (err: any, user: any, info: any) => {
    if (!options.optional && (err || info || !user)) {
      return reject(new AuthError('Please authenticate'));
    }
    req.user = user;
    if (roles.length) {
      const hasRequiredRights = roles.includes(user.role as Role);
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ForbiddenError('Forbidden'));
      }
    }

    resolve();
  };

const requirePermissions =
  (
    roleRights: RoleRights[],
    options: {
      optional?: boolean;
    } = {},
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyPermissionCallback(req, resolve, reject, roleRights, options),
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => {
        next(err);
      });
  };

const requireRoles =
  (
    roles: Role[],
    options: {
      optional?: boolean;
    } = {},
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyRoleCallback(req, resolve, reject, roles, options),
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => {
        next(err);
      });
  };

const auth =
  (options?: { optional: boolean }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyRoleCallback(req, resolve, reject, [], options),
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => {
        next(err);
      });
  };

export { requirePermissions, requireRoles, auth };
