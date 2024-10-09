import Job from "../models/jobModel.js";
import Category from "../models/categoryModel.js";

export const createJob = async (req, res) => {
  try {
    const { category, title, description } = req.body; // category ID from the request body

    // Check if the category exists
    const foundCategory = await Category.findById(category);
    if (!foundCategory) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Create the new job
    const newJob = await Job.create({ category, title, description });

    // Update the category's jobs array
    foundCategory.jobs.push(newJob._id); // Add the new job ID to the category's jobs array
    await foundCategory.save(); // Save the updated category

    return res.status(201).json({ data: newJob });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to create job", error: error.message });
  }
};

export const viewAllCategoryWithJob = async (req, res) => {
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

export const viewAllJob = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 jobs per page

    // Calculate how many documents to skip
    const skip = (page - 1) * limit;

    // Fetch the jobs with pagination
    const jobs = await Job.find({}).skip(skip).limit(limit); // await the find query

    // Get the total count of jobs
    const totalJob = await Job.countDocuments({});

    // Calculate total pages based on the total count and limit
    const totalPages = Math.ceil(totalJob / limit);

    return res.status(200).json({
      data: jobs,
      currentPage: page,
      totalPages: totalPages,
      totalJobs: totalJob,
      jobsPerPage: limit, // Fixed typo
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const editJobById = async (req, res) => {
  try {
    const jobId = req.params.id; // Get the job ID from URL parameters
    console.log(jobId);

    // Update the job using the jobId and req.body
    const job = await Job.findOneAndUpdate(
      { _id: jobId }, // Filter by job ID
      req.body, // The update data
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the update against the schema
      }
    );

    // If no job is found, send a 404 response
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({
      message: "Update succeeded",
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};

export const viewJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    return res.status(200).json(job);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findByIdAndDelete(jobId);
    return res.status(200).json({
      message: "Job delete is success",
      data: job,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};
