import { Router } from "express";
import { addBus } from "../controller/admin.controller.js";

const router = Router();
// router.route("/register").post(registerAdmin);
// router.route("/login").post(loginAdmin);
router.route("/addbus").post(addBus);

export default router;
