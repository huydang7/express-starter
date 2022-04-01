import express from "express";
import { AuthService } from "../services";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const result = await AuthService.register(req.body);
    res.formatter(result);
  } catch (err) {
    next(err);
  }
});

export default router;
