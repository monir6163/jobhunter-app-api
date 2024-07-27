import mongoose, { Schema } from "mongoose";

const noticeSchema = new Schema(
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
    source: {
      type: String,
      trim: true,
    },
    jobimg: [
      {
        public_id: String,
        url: String,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export const Notice = mongoose.model("Notice", noticeSchema);
