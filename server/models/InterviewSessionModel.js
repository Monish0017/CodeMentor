import mongoose from "mongoose";

const interviewSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  interviewType: {
    type: String,
    enum: ["technical", "behavioral", "coding"],
    required: true,
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  feedback: { type: String },
});

const InterviewSession = mongoose.model(
  "InterviewSession",
  interviewSessionSchema
);
export default InterviewSession;
