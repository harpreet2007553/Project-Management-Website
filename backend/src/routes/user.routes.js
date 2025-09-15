import { Router } from "express";
import {registerUser, loginUser, logoutUser, getUser} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

router.post("/register", upload.fields([{ name: 'avatar', maxCount: 1 }]), registerUser)
router.post("/login", loginUser)
router.post("/logout",verifyJWT, logoutUser)
router.get("/get-user", getUser)

export default router;
