import { createProject, deleteProject, getProjectDetails, getUserProjects, userInTeamProjects } from "../controllers/project.controller.js";
import { Router } from "express";

const router = Router();

router.post("/create-project", createProject);
router.get("/get-own-projects", getUserProjects)
router.get("/users-in-team-project", userInTeamProjects)
router.get("/get-project-details", getProjectDetails)
router.get("/delete-project", deleteProject)

export default router;