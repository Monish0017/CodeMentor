import mongoose from "mongoose";

const techNewsJobPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    source: {
      type: String,
      enum: ["LinkedIn", "Indeed", "CodeChef"],
      required: true,
    },
    url: { type: String, required: true },
    type: { type: String, enum: ["Job", "News", "Promotion"], required: true },
  },
  { timestamps: true }
);

const TechNewsJobPost = mongoose.model(
  "TechNewsJobPost",
  techNewsJobPostSchema
);
export default TechNewsJobPost;
