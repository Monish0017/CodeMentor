import InterviewQuestion from "../models/InterviewQuestionModel.js";

/**
 * Create a new interview question
 * (Admin only)
 */
export const createInterviewQuestion = async (req, res) => {
  try {
    // Admin role check
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }

    const { session_id, question } = req.body;

    const newQuestion = new InterviewQuestion({
      session_id,
      question,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error creating interview question:", error);
    res.status(500).json({
      message: "Failed to create interview question",
      error: error.message,
    });
  }
};

/**
 * Get all interview questions
 * (Admin only)
 */
export const getAllInterviewQuestions = async (req, res) => {
  try {
    // Admin role check
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }

    const questions = await InterviewQuestion.find()
      .populate("session_id")
      .sort({ _id: -1 });

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching interview questions:", error);
    res.status(500).json({
      message: "Failed to fetch interview questions",
      error: error.message,
    });
  }
};

/**
 * Get interview questions by session ID
 * (Users can see their own session questions, admins can see all)
 */
export const getQuestionsBySessionId = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { sessionId } = req.params;

    // If regular user, verify they have access to this session
    // This requires session model check which would be implemented separately
    // For now, check if user is admin or participant in the session
    const isParticipant = await checkSessionParticipant(sessionId, req.user.id);

    if (req.user.role !== "admin" && !isParticipant) {
      return res
        .status(403)
        .json({ message: "Access denied to this session's questions" });
    }

    const questions = await InterviewQuestion.find({ session_id: sessionId });

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching session questions:", error);
    res.status(500).json({
      message: "Failed to fetch session questions",
      error: error.message,
    });
  }
};

/**
 * Get an interview question by ID
 * (Users can see their own session questions, admins can see all)
 */
export const getInterviewQuestionById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { id } = req.params;
    const question = await InterviewQuestion.findById(id).populate(
      "session_id"
    );

    if (!question) {
      return res.status(404).json({ message: "Interview question not found" });
    }

    // If regular user, verify they have access to this question's session
    const isParticipant = await checkSessionParticipant(
      question.session_id,
      req.user.id
    );

    if (req.user.role !== "admin" && !isParticipant) {
      return res
        .status(403)
        .json({ message: "Access denied to this question" });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error("Error fetching interview question:", error);
    res.status(500).json({
      message: "Failed to fetch interview question",
      error: error.message,
    });
  }
};

/**
 * Submit an answer to an interview question
 * (Users can submit answers to their own session questions)
 */
export const submitAnswer = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { id } = req.params;
    const { submittedAnswer } = req.body;

    const question = await InterviewQuestion.findById(id).populate(
      "session_id"
    );

    if (!question) {
      return res.status(404).json({ message: "Interview question not found" });
    }

    // Verify user has access to this question's session
    const isParticipant = await checkSessionParticipant(
      question.session_id,
      req.user.id
    );

    if (!isParticipant) {
      return res
        .status(403)
        .json({ message: "Access denied to submit answer for this question" });
    }

    question.submittedAnswer = submittedAnswer;
    await question.save();

    res.status(200).json(question);
  } catch (error) {
    console.error("Error submitting answer:", error);
    res.status(500).json({
      message: "Failed to submit answer",
      error: error.message,
    });
  }
};

/**
 * Provide feedback for an interview question answer
 * (Admin only)
 */
export const provideFeedback = async (req, res) => {
  try {
    // Admin role check
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }

    const { id } = req.params;
    const { feedback, answer } = req.body;

    const updatedQuestion = await InterviewQuestion.findByIdAndUpdate(
      id,
      { feedback, answer },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Interview question not found" });
    }

    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error("Error providing feedback:", error);
    res.status(500).json({
      message: "Failed to provide feedback",
      error: error.message,
    });
  }
};

/**
 * Delete an interview question
 * (Admin only)
 */
export const deleteInterviewQuestion = async (req, res) => {
  try {
    // Admin role check
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }

    const { id } = req.params;
    const deletedQuestion = await InterviewQuestion.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Interview question not found" });
    }

    res
      .status(200)
      .json({ message: "Interview question deleted successfully" });
  } catch (error) {
    console.error("Error deleting interview question:", error);
    res.status(500).json({
      message: "Failed to delete interview question",
      error: error.message,
    });
  }
};

/**
 * Delete all questions for a session
 * (Admin only)
 */
export const deleteQuestionsBySessionId = async (req, res) => {
  try {
    // Admin role check
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }

    const { sessionId } = req.params;
    const result = await InterviewQuestion.deleteMany({
      session_id: sessionId,
    });

    res.status(200).json({
      message: "All questions for this session deleted successfully",
      count: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting session questions:", error);
    res.status(500).json({
      message: "Failed to delete session questions",
      error: error.message,
    });
  }
};

// Helper function to check if a user is a participant in an interview session
// This is a placeholder - you would implement this based on your session model
async function checkSessionParticipant(sessionId, userId) {
  // In a real implementation, you would query your session model
  // to check if the user is a participant

  // Example (pseudocode):
  // const session = await InterviewSession.findById(sessionId);
  // return session.participantId.toString() === userId;

  // For now, just return true for testing purposes
  return true;
}
