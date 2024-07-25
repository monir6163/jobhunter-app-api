import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createJob = asyncHandler(async (req, res) => {
  try {
    const { title, content, place, source, select_last_date, apply_link } =
      req.body;

    const jobimg = req?.files?.map((file) => file.path);

    //upload cloudinary

    const job = new Job({
      title,
      content,
      place,
      source,
      select_last_date,
      apply_link,
    });

    await job.save();

    return res.status(201).json(new ApiResponse(201, "job create Success"));
  } catch (error) {
    throw new ApiError(500, error?.message);
  }
});

export { createJob };
