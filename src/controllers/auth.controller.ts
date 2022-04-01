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

router.post("/login", async (req, res, next) => {
  try {
    const result = await AuthService.loginUserWithEmailAndPassword(
      req.body.email,
      req.body.password
    );
    res.formatter(result);
  } catch (err) {
    next(err);
  }
});

export default router;
