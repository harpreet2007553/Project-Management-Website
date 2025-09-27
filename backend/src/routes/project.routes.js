import { createProject, deleteProject, getProjectDetails, getUserProjects, userInTeamProjects } from "../controllers/project.controller.js";
import { Router } from "express";

const router = Router();

router.post("/create-project", createProject);
router.get("/get-own-projects", getUserProjects)
router.get("/users-in-team-project/:projectId", userInTeamProjects)
router.get("/get-project-details/:projectId", getProjectDetails)
router.get("/delete-project/:projectId", deleteProject)

export default router;