import express from "express";

import isauth from "../middlewares/isauth.js";
import { getAdminJobs,getAllJobs,getJobById,postJob,updateJob } from "../controllers/job.js";

const router = express.Router();

router.route("/post").post(isauth,postJob);
router.route("/get").get(isauth,getAllJobs);
router.route("/getadminjobs").get(isauth,getAdminJobs);
router.route("/get/:id").get(isauth,getJobById);
router.route("/update/:id").put(isauth,updateJob);

export default router;