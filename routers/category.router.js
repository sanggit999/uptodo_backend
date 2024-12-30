import express from "express";
import { addCategory } from "../controllers/category.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addCategory);

export default router;
