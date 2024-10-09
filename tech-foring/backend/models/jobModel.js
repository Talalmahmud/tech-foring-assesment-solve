import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId, // Store the ID of the related category
      ref: "Category", // Refer to the Category model
      required: true,
    },
    title: {
      type: String,
      max: [20, "Job title can not exit 20 characters."],
      required: true,
    },
    description: {
      type: String,
      max: [30, "User email can not exit 20 characters."],
    },
  },
  { timestamps: true }
);

const jobModel = mongoose.model("Job", JobSchema);
export default jobModel;
