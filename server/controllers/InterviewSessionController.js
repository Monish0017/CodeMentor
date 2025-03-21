import InterviewSession from "../models/InterviewSessionModel.js";
import User from "../models/UserModel.js";

/**
 * Role-based permission checker middleware
 * @param {Array} allowedRoles - Roles that are permitted to access the endpoint
 * @returns {Function} Express middleware function
 */
export const checkRolePermission = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (allowedRoles.includes(user.role)) {
        next();
      } else {
        return res.status(403).json({ message: "Permission denied" });
      }
    } catch (error) {
      console.error("Role permission check error:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  };
};

/**
 * Create new interview session
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with created session or error
 */
export const createInterviewSession = async (req, res) => {
  try {
    const { interviewType, startTime, endTime, userId } = req.body;

    // Enhanced validation
    if (!interviewType || !startTime || !endTime) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Validate date formats
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({ message: "Invalid date format provided" });
    }

    // Validate start time is before end time
    if (startDate >= endDate) {
      return res
        .status(400)
        .json({ message: "End time must be after start time" });
    }

    // Validate interview type
    const validInterviewTypes = [
      "Technical",
      "HR",
      "System Design",
      "Behavioral",
    ];
    if (!validInterviewTypes.includes(interviewType)) {
      return res.status(400).json({ message: "Invalid interview type" });
    }

    const newSession = new InterviewSession({
      userId: userId || req.user.id, // Admin can create for others
      interviewType,
      startTime: startDate,
      endTime: endDate,
      status: "Pending",
    });

    await newSession.save();
    return res.status(201).json({
      success: true,
      data: newSession,
    });
  } catch (error) {
    console.error("Create interview session error:", error);
    return res
      .status(500)
      .json({
        message: "Failed to create interview session",
        error: error.message,
      });
  }
};

/**
 * Get all interview sessions with optional filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with session list or error
 */
export const getAllInterviewSessions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let query = {};

    // Role-based filtering
    if (user.role === "admin" || user.role === "interviewer") {
      // Admin and interviewers can see all sessions
      if (req.query.userId) {
        query.userId = req.query.userId; // Optional filtering by userId
      }
    } else {
      // Regular users and candidates can only see their own sessions
      query.userId = req.user.id;
    }

    // Status filtering
    if (req.query.status) {
      const validStatuses = ["Pending", "In Progress", "Completed"];
      if (!validStatuses.includes(req.query.status)) {
        return res.status(400).json({ message: "Invalid status filter" });
      }
      query.status = req.query.status;
    }

    // Type filtering
    if (req.query.interviewType) {
      query.interviewType = req.query.interviewType;
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sessions = await InterviewSession.find(query)
      .sort({ startTime: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "name email");

    // Get total count for pagination
    const totalCount = await InterviewSession.countDocuments(query);

    return res.status(200).json({
      success: true,
      count: sessions.length,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      data: sessions,
    });
  } catch (error) {
    console.error("Get all interview sessions error:", error);
    return res
      .status(500)
      .json({
        message: "Failed to retrieve interview sessions",
        error: error.message,
      });
  }
};

/**
 * Get interview session by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with session data or error
 */
export const getInterviewSessionById = async (req, res) => {
  try {
    const session = await InterviewSession.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!session) {
      return res.status(404).json({ message: "Interview session not found" });
    }

    // Check if user has permission to view this session
    const user = await User.findById(req.user.id);
    if (
      user.role !== "admin" &&
      user.role !== "interviewer" &&
      session.userId.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Permission denied" });
    }

    return res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error("Get interview session error:", error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve interview session" });
  }
};

/**
 * Update interview session
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with updated session or error
 */
export const updateInterviewSession = async (req, res) => {
  try {
    const session = await InterviewSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Interview session not found" });
    }

    // Check for user permission to update
    const user = await User.findById(req.user.id);
    if (
      user.role !== "admin" &&
      user.role !== "interviewer" &&
      session.userId.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Permission denied" });
    }

    // Only admin and interviewer can update feedback
    if (
      req.body.feedback &&
      user.role !== "admin" &&
      user.role !== "interviewer"
    ) {
      return res
        .status(403)
        .json({ message: "Only interviewers can provide feedback" });
    }

    // Validate date formats if provided
    if (req.body.startTime) {
      const startDate = new Date(req.body.startTime);
      if (isNaN(startDate)) {
        return res.status(400).json({ message: "Invalid start time format" });
      }
      req.body.startTime = startDate;
    }

    if (req.body.endTime) {
      const endDate = new Date(req.body.endTime);
      if (isNaN(endDate)) {
        return res.status(400).json({ message: "Invalid end time format" });
      }
      req.body.endTime = endDate;
    }

    // Check that start time is before end time if both are provided
    if (req.body.startTime && req.body.endTime) {
      if (req.body.startTime >= req.body.endTime) {
        return res
          .status(400)
          .json({ message: "End time must be after start time" });
      }
    }

    const updatedSession = await InterviewSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedSession,
    });
  } catch (error) {
    console.error("Update interview session error:", error);
    return res
      .status(500)
      .json({
        message: "Failed to update interview session",
        error: error.message,
      });
  }
};

/**
 * Delete interview session
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success message or error
 */
export const deleteInterviewSession = async (req, res) => {
  try {
    const session = await InterviewSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Interview session not found" });
    }

    // Only admin can delete sessions
    const user = await User.findById(req.user.id);
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only administrators can delete sessions" });
    }

    await InterviewSession.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Interview session deleted successfully",
    });
  } catch (error) {
    console.error("Delete interview session error:", error);
    return res
      .status(500)
      .json({ message: "Failed to delete interview session" });
  }
};

/**
 * Update session status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with updated status or error
 */
export const updateSessionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "In Progress", "Completed"];

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
        validOptions: validStatuses,
      });
    }

    const session = await InterviewSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Interview session not found" });
    }

    // Check permissions
    const user = await User.findById(req.user.id);
    if (user.role !== "admin" && user.role !== "interviewer") {
      return res
        .status(403)
        .json({ message: "Only interviewers can update session status" });
    }

    session.status = status;
    // Record who made the status change and when
    session.lastUpdatedBy = req.user.id;
    session.lastUpdateTime = new Date();

    await session.save();

    return res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error("Update session status error:", error);
    return res.status(500).json({
      message: "Failed to update session status",
      error: error.message,
    });
  }
};
