import { Router } from "express";
import { createJob, getJobs } from "../controllers/job.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/getJobs/:category").get(getJobs);
router.route("/createJob").post(jwtVerify, upload.array("jobimg"), createJob);

export default router;
