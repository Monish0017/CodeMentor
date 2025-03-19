import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  code: { type: String, required: true },
  language: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Compiling", "Running", "Completed", "Failed"],
    default: "Pending",
  },
  result: { type: String },
  executionTime: { type: Number },
  submittedAt: { type: Date, default: Date.now },
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
