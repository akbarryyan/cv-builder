import express from "express";
import {
  createCV,
  getCVById,
  getUserCVs,
  updateCV,
  deleteCV,
} from "../controllers/cvController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// All CV routes require authentication
router.use(authenticateToken);

// CV CRUD routes
router.post("/", createCV); // POST /api/cvs - Create new CV
router.get("/", getUserCVs); // GET /api/cvs - Get all user's CVs
router.get("/:cvId", getCVById); // GET /api/cvs/:id - Get specific CV
router.put("/:cvId", updateCV); // PUT /api/cvs/:id - Update CV
router.delete("/:cvId", deleteCV); // DELETE /api/cvs/:id - Delete CV

export default router;
