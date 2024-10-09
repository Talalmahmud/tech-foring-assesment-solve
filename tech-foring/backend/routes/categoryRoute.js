import express from "express";

import { userAuth } from "../utils/auth.js";
import {
  createCategory,
  deleteCategory,
  viewAllCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/category", userAuth, createCategory);
router.get("/category", userAuth, viewAllCategory);
router.delete("/category/:id", userAuth, deleteCategory);

export default router;
