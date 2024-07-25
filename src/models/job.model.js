import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    place: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      trim: true,
    },
    select_last_date: {
      type: Date,
    },
    apply_link: {
      type: String,
      trim: true,
    },
    jobimg: { public_id: String, url: String },
  },
  { timestamps: true, versionKey: false }
);

export const Job = mongoose.model("Job", jobSchema);
