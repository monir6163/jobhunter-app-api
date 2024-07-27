import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryMultipleUpload } from "../utils/cloudinary.js";

const getJobs = asyncHandler(async (req, res) => {
  try {
    const { category } = req.params;
    const jobs = await Job.find({ category }).sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, jobs));
  } catch (error) {
    throw new ApiError(500, error?.message);
  }
});

const createJob = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      content,
      place,
      source,
      select_last_date,
      apply_link,
      category,
    } = req.body;
    if (!title || !select_last_date) {
      throw new ApiError(400, "All fields are required");
    }

    let folder = category === "govt" ? "govt" : "non-govt";

    const jobimgLocalPath = req.files?.map((file) => file.path);
    const cloudinaryImg = await cloudinaryMultipleUpload(
      jobimgLocalPath,
      folder
    );

    const job = new Job({
      title,
      content,
      place,
      source,
      select_last_date,
      apply_link,
      jobimg: cloudinaryImg,
      category,
    });

    await job.save();

    return res.status(201).json(new ApiResponse(201, "job create Success"));
  } catch (error) {
    throw new ApiError(500, error?.message);
  }
});

export { createJob, getJobs };
