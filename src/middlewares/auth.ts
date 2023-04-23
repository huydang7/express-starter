import { AuthError, ForbiddenError } from 'exceptions';
import { NextFunction, Request, Response } from 'express';
import { AllRoles, Role, RoleRights } from 'interfaces/user';
import { IUser } from 'interfaces/user';
import passport from 'passport';

const verifyCallback =
  (
    req: any,
    resolve: any,
    reject: any,
    options: {
      optional?: boolean;
      requiredRights?: RoleRights[];
      requiredRoles?: Role[];
    } = {},
  ) =>
  async (err: any, user: IUser, info: any) => {
    const {
      optional = false,
      requiredRights = [],
      requiredRoles = [],
    } = options;

    if (!optional && (err || info || !user)) {
      return reject(new AuthError('Please authenticate'));
    }
    req.user = user;

    if (requiredRoles.length) {
      const hasRequiredRights = requiredRoles.includes(user.role);
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ForbiddenError('Forbidden'));
      }
    }

    if (requiredRights.length) {
      const userRights = AllRoles[user.role] || [];
      const hasRequiredRights = requiredRights.every(
        (requiredRight: RoleRights) => userRights.includes(requiredRight),
      );
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ForbiddenError('Forbidden'));
      }
    }

    resolve();
  };

const requirePermissions =
  (
    roleRights: RoleRights[],
    options?: {
      optional?: boolean;
    },
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return verifyJwt(req, res, next, {
      ...options,
      requiredRights: roleRights,
    });
  };

const requireRoles =
  (
    roles: Role[],
    options?: {
      optional?: boolean;
    },
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return verifyJwt(req, res, next, {
      ...options,
      requiredRoles: roles,
    });
  };

const auth =
  (options?: { optional?: boolean }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return verifyJwt(req, res, next, options);
  };

const verifyJwt = async (
  req: Request,
  res: Response,
  next: NextFunction,
  callbackOpts: any,
) => {
  try {
    await new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, resolve, reject, callbackOpts),
      )(req, res, next);
    });
    return next();
  } catch (err) {
    next(err);
  }
};

export { requirePermissions, requireRoles, auth };
