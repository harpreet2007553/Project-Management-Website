import { Router } from "express";
import {registerUser} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post("/register", upload.fields([{ name: 'avatar', maxCount: 1 }]), registerUser)

export default router;
