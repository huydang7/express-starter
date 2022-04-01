import passport from "passport";
import httpStatus from "http-status";
import { ApiError } from "../exceptions/api-error";
import { NextFunction, Request, Response } from "express";
import { AllRoles, Role, RoleRights } from "../configs/roles";

const verifyCallback =
  (
    req: Request,
    resolve: any,
    reject: any,
    requiredRights: RoleRights[],
    options: {
      optional?: boolean;
    } = {}
  ) =>
  async (err: any, user: any, info: any) => {
    if ((err || info || !user) && !options.optional) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = AllRoles[user.role as Role] || [];
      const hasRequiredRights = requiredRights.every(
        (requiredRight: RoleRights) => userRights.includes(requiredRight)
      );
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
      }
    }

    resolve();
  };

const authByRights =
  (
    roleRights: RoleRights[],
    options: {
      optional?: boolean;
    } = {}
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject, roleRights, options)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => {
        next(err);
      });
  };

export { authByRights };
