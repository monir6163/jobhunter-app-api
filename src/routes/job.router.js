import { Router } from "express";
import { createJob } from "../controllers/job.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/createJob").post(jwtVerify, upload.array("jobimg"), createJob);

export default router;
