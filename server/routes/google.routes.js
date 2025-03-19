import express from "express";
import {
  redirectToGoogleAuth,
  handleGoogleCallback,
  // fetchCourses,
  // manualSync,
  provideTokens,
  getUserData,
} from "../controllers/google.controller.js";

const router = express.Router();

// Redirect to Google for authentication
router.get("/auth", redirectToGoogleAuth);

// Handle Google OAuth2 callback
router.get("/oauth2callback", handleGoogleCallback);

// Fetch and display courses
// router.get("/courses", fetchCourses);

// Fetch and display user profile
router.get("/profile", getUserData);

// Manually trigger synchronization
// router.get("/sync", manualSync);

// Get Google tokens
router.get("/tokens", provideTokens);

export default router;
