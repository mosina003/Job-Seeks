import express from "express";
import isauth from "../middlewares/isauth.js";
import { singleUpload } from "../middlewares/multer.js";
import { getCompany, getCompanyById,updateCompany,registerCompany } from "../controllers/company.js";

const router = express.Router();

router.route("/register").post(isauth, registerCompany);
router.route("/get").get(isauth, getCompany);
router.route("/get/:id").get(isauth, getCompanyById);
router.route("/update/:id").put(isauth, singleUpload, updateCompany);

export default router;