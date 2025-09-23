import { Router } from "express";
import { createTask, deleteTask, getAllTasks } from "../controllers/task.controller.js";

const router = Router()

router.post("/create-task", createTask)
router.post("/delete-task", deleteTask)
router.get("/get-tasks", getAllTasks)

export default router