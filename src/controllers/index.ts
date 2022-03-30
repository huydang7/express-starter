import authController from "./user.controller";
import express from "express";
const router = express.Router();

router.use("/user", authController);

export default router;
