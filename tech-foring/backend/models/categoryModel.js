import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      max: [20, "Category title can not exit 20 characters."],
    },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Category", CategorySchema);
export default categoryModel;
