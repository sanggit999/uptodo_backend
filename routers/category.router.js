import express from "express";
import {
  addCategory,
  getCategories,
} from "../controllers/category.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addCategory);
router.get("/categories", authMiddleware, getCategories);
export default router;
