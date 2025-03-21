import Problem from "../models/ProblemModel.js";

// Create a new problem
const createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      input,
      output,
      constraints,
      leetcodeId,
    } = req.body;

    // Add creator ID from authenticated user
    const creatorId = req.user._id;

    const newProblem = new Problem({
      title,
      description,
      difficulty,
      tags,
      input,
      output,
      constraints,
      leetcodeId,
      creatorId,
    });

    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (error) {
    res.status(500).json({
      message: "Error creating problem",
      error: error.message,
    });
  }
};

// Get all problems
const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find()
      .populate("creatorId", "username email")
      .sort({ createdAt: -1 });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching problems",
      error: error.message,
    });
  }
};

// Get problem by ID
const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findById(id).populate(
      "creatorId",
      "username email"
    );

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching problem",
      error: error.message,
    });
  }
};

// Update a problem
const updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const problem = await Problem.findById(id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Check if user is authorized to update (creator or admin)
    if (
      problem.creatorId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this problem" });
    }

    const updatedProblem = await Problem.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json(updatedProblem);
  } catch (error) {
    res.status(500).json({
      message: "Error updating problem",
      error: error.message,
    });
  }
};

// Delete a problem
const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await Problem.findById(id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Check if user is authorized to delete (creator or admin)
    if (
      problem.creatorId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this problem" });
    }

    await Problem.findByIdAndDelete(id);
    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting problem",
      error: error.message,
    });
  }
};

// Get problems by difficulty
const getProblemsByDifficulty = async (req, res) => {
  try {
    const { difficulty } = req.params;
    const problems = await Problem.find({ difficulty })
      .populate("creatorId", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching problems",
      error: error.message,
    });
  }
};

// Get problems by tag
const getProblemsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const problems = await Problem.find({ tags: tag })
      .populate("creatorId", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching problems",
      error: error.message,
    });
  }
};

// Search problems
const searchProblems = async (req, res) => {
  try {
    const { query } = req.query;

    const problems = await Problem.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    }).populate("creatorId", "username email");

    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({
      message: "Error searching problems",
      error: error.message,
    });
  }
};

// ADMIN ONLY FUNCTIONS

// Bulk delete problems - Admin only
const bulkDeleteProblems = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { problemIds } = req.body;

    if (!problemIds || !Array.isArray(problemIds) || problemIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Valid problem IDs are required" });
    }

    const result = await Problem.deleteMany({ _id: { $in: problemIds } });

    res.status(200).json({
      message: `${result.deletedCount} problems deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting problems",
      error: error.message,
    });
  }
};

// Approve problem - Admin only
const approveProblem = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { id } = req.params;

    const problem = await Problem.findById(id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    problem.approved = true;
    await problem.save();

    res.status(200).json({
      message: "Problem approved successfully",
      problem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error approving problem",
      error: error.message,
    });
  }
};

// Get all problems including unapproved - Admin only
const getAllProblemsAdmin = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const problems = await Problem.find()
      .populate("creatorId", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching problems",
      error: error.message,
    });
  }
};

export {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
  getProblemsByDifficulty,
  getProblemsByTag,
  searchProblems,
  // Admin functions
  bulkDeleteProblems,
  approveProblem,
  getAllProblemsAdmin,
};
