import InterviewSession from "../models/InterviewSessionModel.js";
import User from "../models/UserModel.js";

// Role-based permission checker middleware
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
      return res.status(500).json({ message: "Server error" });
    }
  };
};

// Create new interview session
export const createInterviewSession = async (req, res) => {
  try {
    const { interviewType, startTime, endTime } = req.body;

    // Basic validation
    if (!interviewType || !startTime || !endTime) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const newSession = new InterviewSession({
      userId: req.body.userId || req.user.id, // Admin can create for others
      interviewType,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
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
      .json({ message: "Failed to create interview session" });
  }
};

// Get all interview sessions
export const getAllInterviewSessions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

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
      query.status = req.query.status;
    }

    // Type filtering
    if (req.query.interviewType) {
      query.interviewType = req.query.interviewType;
    }

    const sessions = await InterviewSession.find(query)
      .sort({ startTime: -1 })
      .populate("userId", "name email");

    return res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    console.error("Get all interview sessions error:", error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve interview sessions" });
  }
};

// Get interview session by ID
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

// Update interview session
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
      .json({ message: "Failed to update interview session" });
  }
};

// Delete interview session
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

// Update session status
export const updateSessionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
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
    await session.save();

    return res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error("Update session status error:", error);
    return res.status(500).json({ message: "Failed to update session status" });
  }
};
