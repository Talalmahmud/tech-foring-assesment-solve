import express from "express";
import {
  createJob,
  deleteJob,
  editJobById,
  viewAllCategoryWithJob,
  viewAllJob,
  viewJobById,
} from "../controllers/jobController.js";
import { userAuth } from "../utils/auth.js";

const router = express.Router();

router.get("/job", userAuth, viewAllCategoryWithJob);
router.post("/job", userAuth, createJob);
router.put("/job/:id", userAuth, editJobById);
router.delete("/job/:id", userAuth, deleteJob);
router.get("/job/:id", userAuth, viewJobById);

export default router;
