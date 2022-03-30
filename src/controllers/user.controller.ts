import express from "express";
import { getUsers } from "../services/user.service";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const [users, count] = await getUsers();
    res.formatter({ users, count });
  } catch (err) {
    next(err);
  }
});

export default router;
