import UserStats from "../models/UserStatsModel.js";

// Get stats for a specific user
export const getUserStats = async (req, res) => {
  try {
    const { userId } = req.params;

    let userStats = await UserStats.findOne({ userId });

    if (!userStats) {
      // Create default stats if none exist
      userStats = new UserStats({ userId });
      await userStats.save();
    }

    res.status(200).json({
      success: true,
      data: userStats,
    });
  } catch (error) {
    console.error("Error getting user stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get user statistics",
      error: error.message,
    });
  }
};

// Update user stats
export const updateUserStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    // Find and update, create if doesn't exist
    const userStats = await UserStats.findOneAndUpdate(
      { userId },
      { ...updates, lastUpdated: Date.now() },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: userStats,
      message: "User statistics updated successfully",
    });
  } catch (error) {
    console.error("Error updating user stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user statistics",
      error: error.message,
    });
  }
};

// Increment problems solved count
export const incrementProblemsSolved = async (req, res) => {
  try {
    const { userId } = req.params;
    const { scoreIncrement = 0, timeSpent = 0 } = req.body;

    // Find current stats
    let userStats = await UserStats.findOne({ userId });

    if (!userStats) {
      userStats = new UserStats({
        userId,
        problemsSolved: 1,
        timeSpent: timeSpent,
        averageScore: scoreIncrement,
      });
    } else {
      // Calculate new average score
      const totalScoreBefore =
        userStats.averageScore * userStats.problemsSolved;
      const newProblemCount = userStats.problemsSolved + 1;
      const newAverageScore =
        (totalScoreBefore + scoreIncrement) / newProblemCount;

      userStats.problemsSolved = newProblemCount;
      userStats.timeSpent += timeSpent;
      userStats.averageScore = newAverageScore;
    }

    userStats.lastUpdated = Date.now();
    await userStats.save();

    res.status(200).json({
      success: true,
      data: userStats,
      message: "Problem solved count incremented",
    });
  } catch (error) {
    console.error("Error incrementing problems solved:", error);
    res.status(500).json({
      success: false,
      message: "Failed to increment problems solved count",
      error: error.message,
    });
  }
};

// Update user study plan
export const updateStudyPlan = async (req, res) => {
  try {
    const { userId } = req.params;
    const { studyPlan } = req.body;

    if (!studyPlan) {
      return res.status(400).json({
        success: false,
        message: "Study plan is required",
      });
    }

    const userStats = await UserStats.findOneAndUpdate(
      { userId },
      { studyPlan, lastUpdated: Date.now() },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      data: userStats,
      message: "Study plan updated successfully",
    });
  } catch (error) {
    console.error("Error updating study plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update study plan",
      error: error.message,
    });
  }
};

// Get leaderboard based on problems solved or average score
export const getLeaderboard = async (req, res) => {
  try {
    const { sortBy = "problemsSolved", limit = 10 } = req.query;

    // Validate sort parameter
    const validSortFields = ["problemsSolved", "averageScore", "timeSpent"];
    if (!validSortFields.includes(sortBy)) {
      return res.status(400).json({
        success: false,
        message: `Invalid sort parameter. Must be one of: ${validSortFields.join(
          ", "
        )}`,
      });
    }

    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = -1; // Descending order

    const leaderboard = await UserStats.find()
      .sort(sortObj)
      .limit(Number(limit))
      .populate("userId", "username avatar"); // Get user details

    res.status(200).json({
      success: true,
      data: leaderboard,
    });
  } catch (error) {
    console.error("Error getting leaderboard:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get leaderboard",
      error: error.message,
    });
  }
};
