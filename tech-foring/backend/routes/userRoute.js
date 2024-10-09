import express from "express";
import {
  createUser,
  userLogin,
  verifyUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/user", createUser);
router.post("/login", userLogin);
router.get("/verify-token", verifyUser);

export default router;
