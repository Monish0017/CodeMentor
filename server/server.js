import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import sessionMiddleware from "./middlewares/session.js";

import googleRoutes from "./routes/google.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import userRoute from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(sessionMiddleware);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/google", googleRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api", userRoute);

// Root route
app.get("/", (req, res) => {
  res.send("Code Mentor is woking");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
