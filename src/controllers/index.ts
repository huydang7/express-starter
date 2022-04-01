import userController from "./user.controller";
import authController from "./auth.controller";

import express from "express";
const router = express.Router();

router.use("/user", userController);
router.use("/auth", authController);

export default router;
