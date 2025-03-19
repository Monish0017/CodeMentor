import mongoose from "mongoose";

const problemTagSchema = new mongoose.Schema(
  {
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    tag: { type: String, required: true },
  },
  { timestamps: true }
);

const ProblemTag = mongoose.model("ProblemTag", problemTagSchema);
export default ProblemTag;
