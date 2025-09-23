import { Router } from "express";
import {
  addMemberToProject,
  getMembersOfProject,
  removeMemberFromProject,
} from "../controllers/member.controller.js";

const router = Router();

router.post("/add-member", addMemberToProject);
router.post("/remove-member", removeMemberFromProject);
router.get("/get-members", getMembersOfProject);

export default router;
