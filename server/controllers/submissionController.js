import Submission from "../models/SubmissionModel.js";

/**
 * Create a new submission
 * (Any authenticated user can submit code)
 */
export const createSubmission = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { problemId, code, language } = req.body;
    const userId = req.user.id;

    const newSubmission = new Submission({
      problemId,
      userId,
      code,
      language,
    });

    const savedSubmission = await newSubmission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    console.error("Error creating submission:", error);
    res.status(500).json({
      message: "Failed to create submission",
      error: error.message,
    });
  }
};

/**
 * Get all submissions (admin only)
 */
export const getAllSubmissions = async (req, res) => {
  try {
    // Admin role check
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }

    const submissions = await Submission.find()
      .populate("userId", "username email")
      .populate("problemId", "title")
      .sort({ submittedAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({
      message: "Failed to fetch submissions",
      error: error.message,
    });
  }
};

/**
 * Get a specific submission by ID
 * (Users can see their own, admins can see all)
 */
export const getSubmissionById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { id } = req.params;
    const submission = await Submission.findById(id)
      .populate("userId", "username email")
      .populate("problemId", "title");

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Check if the user has access to this submission
    if (
      req.user.role !== "admin" &&
      submission.userId._id.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "Access denied to this submission" });
    }

    res.status(200).json(submission);
  } catch (error) {
    console.error("Error fetching submission:", error);
    res.status(500).json({
      message: "Failed to fetch submission",
      error: error.message,
    });
  }
};

/**
 * Get submissions by user ID
 * (Users can see their own, admins can see all)
 */
export const getSubmissionsByUserId = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { userId } = req.params;

    // Only allow users to see their own submissions, admins can see all
    if (req.user.role !== "admin" && userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const submissions = await Submission.find({ userId })
      .populate("problemId", "title")
      .sort({ submittedAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching user submissions:", error);
    res.status(500).json({
      message: "Failed to fetch user submissions",
      error: error.message,
    });
  }
};

/**
 * Update a submission status (admin only)
 */
export const updateSubmissionStatus = async (req, res) => {
  try {
    // Admin role check
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }

    const { id } = req.params;
    const { status, result, executionTime } = req.body;

    const updatedSubmission = await Submission.findByIdAndUpdate(
      id,
      { status, result, executionTime },
      { new: true }
    );

    if (!updatedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json(updatedSubmission);
  } catch (error) {
    console.error("Error updating submission:", error);
    res.status(500).json({
      message: "Failed to update submission",
      error: error.message,
    });
  }
};

/**
 * Delete a submission (admin only)
 */
export const deleteSubmission = async (req, res) => {
  try {
    // Admin role check
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }

    const { id } = req.params;
    const deletedSubmission = await Submission.findByIdAndDelete(id);

    if (!deletedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (error) {
    console.error("Error deleting submission:", error);
    res.status(500).json({
      message: "Failed to delete submission",
      error: error.message,
    });
  }
};

/**
 * Get submissions by problem ID (admin only)
 */
export const getSubmissionsByProblemId = async (req, res) => {
  try {
    // Admin role check
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }

    const { problemId } = req.params;
    const submissions = await Submission.find({ problemId })
      .populate("userId", "username email")
      .sort({ submittedAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching problem submissions:", error);
    res.status(500).json({
      message: "Failed to fetch problem submissions",
      error: error.message,
    });
  }
};
