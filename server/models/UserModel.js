import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    profilePicture: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "User" },
    dateJoined: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    stats: { type: mongoose.Schema.Types.ObjectId, ref: "UserStats" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
