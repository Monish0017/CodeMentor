import mongoose from "mongoose";

const userStatsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemsSolved: { type: Number, default: 0 },
    timeSpent: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    studyPlan: { type: mongoose.Schema.Types.Mixed },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const UserStats = mongoose.model("UserStats", userStatsSchema);
export default UserStats;
