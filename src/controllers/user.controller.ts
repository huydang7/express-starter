import express from "express";
import { RoleRights } from "../configs/roles";
import { authByRights } from "../middlewares/auth";
import { UserService } from "../services";
import { pick } from "../utils";

const router = express.Router();

router.get(
  "/",
  authByRights([RoleRights.adminOnly]),
  async (req, res, next) => {
    try {
      const filter = pick(req.query, ["name", "role"]);
      const options = pick(req.query, ["sort", "limit", "page"]);
      const result = await UserService.queryUsers(filter, options);
      res.formatter({ users: result.docs, count: result.totalDocs });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
