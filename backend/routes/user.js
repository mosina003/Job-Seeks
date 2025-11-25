import express from "express";
import { register, login, updateprofile, logout } from "../controllers/user.js";
import isauth from "../middlewares/isauth.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isauth, singleUpload, updateprofile);

export default router;

