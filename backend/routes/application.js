import express from "express";
import isauth from "../middlewares/isauth.js";
import { applyJob, getAppliedJobs, getApplicants, updateStatus } from "../controllers/application.js";

const router = express.Router();

router.route("/apply/:id").get(isauth,  applyJob);
router.route("/get").get(isauth, getAppliedJobs);
router.route("/:id/applicants").get(isauth, getApplicants);
router.route("/status/:id/update").post(isauth, updateStatus);

export default router;