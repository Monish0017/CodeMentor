import mongoose from "mongoose";

const interviewQuestionSchema = new mongoose.Schema({
  session_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InterviewSession",
    required: true,
  },
  question: { type: String, required: true },
  answer: { type: String },
  submittedAnswer: { type: String },
  feedback: { type: String },
});

const InterviewQuestion = mongoose.model(
  "InterviewQuestion",
  interviewQuestionSchema
);
export default InterviewQuestion;
