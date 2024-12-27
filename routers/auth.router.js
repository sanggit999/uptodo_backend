import express from "express";
import { signup, signin, getUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/user", authMiddleware, getUser);

export default router;
