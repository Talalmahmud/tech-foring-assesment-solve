import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    return res.status(200).json({ data: newCategory });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to create category", error: error.message });
  }
};

export const viewAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({}).populate("jobs");

    return res.status(200).json({
      data: categories,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// export const viewJobById = async (req, res) => {
//   try {
//     const jobId = req.params.id;

//     const job = await Job.findById(jobId);
//     return res.status(200).json({
//       data: job,
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Internal server error", error: error });
//   }
// };

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findByIdAndDelete(categoryId);
    return res.status(200).json({
      message: "Category delete is success",
      data: category,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};
