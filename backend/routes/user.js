import { Router } from "express";
import {
  demo,
  registerUser,
  loginUser,
} from "../controller/user.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/demo").get(auth, demo);

export default router;
