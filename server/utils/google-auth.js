import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Generate the URL for Google OAuth
export const getAuthUrl = () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline", // Offline access to get refresh token
    prompt: "consent", // Required to get refresh token
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  return authUrl;
};

// Get tokens from the code after user has logged in
export const getGoogleTokens = async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return tokens;
};

// Get Google Classroom API instance
// export const getClassroomApi = (accessToken) => {
//   const oauth2Client = new google.auth.OAuth2();
//   oauth2Client.setCredentials({ access_token: accessToken });
//   return google.classroom({ version: "v1", auth: oauth2Client });
// };

// Get Google People API instance
export const getPeopleApi = () => {
  return google.people({ version: "v1", auth: oAuth2Client });
};
