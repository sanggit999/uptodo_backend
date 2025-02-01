import express from "express";
import { addTask, getTasks } from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addTask);
router.get("/tasks", authMiddleware, getTasks);

export default router;
