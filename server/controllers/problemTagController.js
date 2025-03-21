import ProblemTag from "../models/ProblemTagModel.js";

/**
 * Create a new problem tag
 */
export const createProblemTag = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    const { problemId, tag } = req.body;

    // Check if this tag already exists for this problem
    const existingTag = await ProblemTag.findOne({ problemId, tag });
    if (existingTag) {
      return res
        .status(400)
        .json({ message: "This tag is already assigned to the problem" });
    }

    const newProblemTag = new ProblemTag({ problemId, tag });
    const savedProblemTag = await newProblemTag.save();

    res.status(201).json(savedProblemTag);
  } catch (error) {
    console.error("Error creating problem tag:", error);
    res
      .status(500)
      .json({ message: "Failed to create problem tag", error: error.message });
  }
};

/**
 * Get all problem tags
 */
export const getAllProblemTags = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    const problemTags = await ProblemTag.find().sort({ createdAt: -1 });
    res.status(200).json(problemTags);
  } catch (error) {
    console.error("Error fetching problem tags:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch problem tags", error: error.message });
  }
};

/**
 * Get all tags for a specific problem
 */
export const getTagsByProblemId = async (req, res) => {
  try {
    const { problemId } = req.params;
    const problemTags = await ProblemTag.find({ problemId });

    // Extract just the tag values for cleaner response
    const tags = problemTags.map((pt) => pt.tag);

    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching tags for problem:", error);
    res.status(500).json({
      message: "Failed to fetch tags for problem",
      error: error.message,
    });
  }
};

/**
 * Get all problems with a specific tag
 */
export const getProblemsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const problemTags = await ProblemTag.find({ tag })
      .populate("problemId")
      .exec();

    // Extract the populated problem data
    const problems = problemTags.map((pt) => pt.problemId);

    res.status(200).json(problems);
  } catch (error) {
    console.error("Error fetching problems by tag:", error);
    res.status(500).json({
      message: "Failed to fetch problems by tag",
      error: error.message,
    });
  }
};

/**
 * Delete a problem tag
 */
export const deleteProblemTag = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    const { id } = req.params;
    const deletedTag = await ProblemTag.findByIdAndDelete(id);

    if (!deletedTag) {
      return res.status(404).json({ message: "Problem tag not found" });
    }

    res.status(200).json({ message: "Problem tag deleted successfully" });
  } catch (error) {
    console.error("Error deleting problem tag:", error);
    res
      .status(500)
      .json({ message: "Failed to delete problem tag", error: error.message });
  }
};

/**
 * Delete all tags for a specific problem
 */
export const deleteTagsByProblemId = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    const { problemId } = req.params;
    const result = await ProblemTag.deleteMany({ problemId });

    res.status(200).json({
      message: "Tags deleted successfully",
      count: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting tags for problem:", error);
    res.status(500).json({
      message: "Failed to delete tags for problem",
      error: error.message,
    });
  }
};

// /**
//  * Get all unique tags in the system
//  */
// export const getAllUniqueTags = async (req, res) => {
//   try {
//     const uniqueTags = await ProblemTag.distinct("tag");
//     res.status(200).json(uniqueTags);
//   } catch (error) {
//     console.error("Error fetching unique tags:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch unique tags", error: error.message });
//   }
// };
