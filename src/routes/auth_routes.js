import authenticateToken from "../middlewares/auth_middleware.js";
import { register, login } from "../controllers/auth_controller.js";
import express from "express";

// Create router object
const router = express.Router();

// Use the authenticateToken middleware for specific routes
router.post("/register", register);
router.post("/login", login);
router.post("/", authenticateToken); // Apply the middleware to all routes under this path

export default router;
