import { createTopic, getAllProjectTopics, deleteTopic} from "../controllers/topic.controller.js";
import {Router} from "express";

const router = Router();

router.post("/create-topic", createTopic);
router.get("/delete-topic", deleteTopic);
router.get("/get-project-topics", getAllProjectTopics);

export default router;