import {
  getAuthUrl,
  getGoogleTokens,
  getPeopleApi,
} from "../utils/google-auth.js";
import { syncGoogleClassroomData } from "../services/googleSync.service.js";
import User from "../models/UserModel.js";

/**
 * Redirect to Google for authentication
 */
export const redirectToGoogleAuth = (req, res) => {
  // Check if user is already authenticated
  if (req.session.user && req.session.tokens) {
    // return res.status(200).send("User is already authenticated!");
    const userExpiry = req.session.tokens.expiry_date;
    // user expiry is like 1734803829953
    const currentTime = new Date().getTime();
    // console.log({ userExpiry, currentTime });
    if (currentTime > userExpiry) {
      // It means the user's token has expired
      // So, redirect to Google Auth endpoint
      const authUrl = getAuthUrl();
      return res.redirect(authUrl);
    } else {
      // User is already authenticated
      // Redirect to frontend with non-sensitive data in query parameters
      const queryParams = new URLSearchParams({
        googleId: req.session.user,
      }).toString();
      return res.redirect(
        `${process.env.GOOGLE_CLIENT_SUCCESS_REDIRECT_URL}&${queryParams}`
      );
    }
  }

  const authUrl = getAuthUrl();
  res.redirect(authUrl);
};

/**
 * Handle the Google OAuth2 callback and store tokens in session
 */
export const handleGoogleCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Authorization code is missing");
  }

  try {
    const tokens = await getGoogleTokens(code);
    req.session.tokens = tokens; // Store tokens in session

    const peopleApi = getPeopleApi(tokens);
    const profileResponse = await peopleApi.people.get({
      resourceName: "people/me",
      personFields: "names,emailAddresses,photos",
    });

    const profileData = profileResponse.data;
    console.log(profileData);
    const googleId = profileData.resourceName.split("/")[1];

    // Save user info in session
    req.session.user = googleId;

    // Create or update user in the database
    const username =
      `${profileData.names[0].givenName}${profileData.names[0].familyName}${googleId}`
        .toLowerCase()
        .replace(/\s+/g, ""); // Remove whitespace
    const userData = {
      googleId,
      email: profileData.emailAddresses[0]?.value,
      name: profileData.names[0]?.displayName,
      profilePicture: profileData.photos[0]?.url,
      username,
      tokens: tokens,
    };

    const user = await User.findOneAndUpdate(
      { googleId },
      { $set: userData },
      { upsert: true, new: true }
    );

    // Redirect to frontend with non-sensitive data in query parameters
    const queryParams = new URLSearchParams({
      googleId: user.googleId,
    }).toString();

    res.redirect(
      `${process.env.GOOGLE_CLIENT_SUCCESS_REDIRECT_URL}&${queryParams}`
    );
  } catch (error) {
    console.error("Error during Google callback:", error.message);
    res
      .status(500)
      .send("Error during Google token exchange: " + error.message);
  }
};

export const getUserData = async (req, res) => {
  // console.log({ session: req.session });
  if (!req.session.user) {
    // return res.redirect("/api/google/auth");
    return res.status(401).send("User is not authenticated.");
  }

  const user = await User.findOne({ googleId: req.session.user });
  res.status(200).json(user);
};

export const provideTokens = async (req, res) => {
  if (!req.session.tokens) {
    return res.redirect("/api/google/auth");
  }

  res.status(200).json(req.session.tokens);
};
