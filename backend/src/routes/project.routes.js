import { createProject, getUserProjects } from "../controllers/project.controller.js";
import { Router } from "express";

const router = Router();

router.post("/create-project", createProject);
router.get("/get-own-projects", getUserProjects)

export default router;