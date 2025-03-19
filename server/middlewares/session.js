import session from "express-session";
import MongoStore from "connect-mongo"; // Example using MongoDB
import dotenv from "dotenv";

dotenv.config();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET, // Secret for signing the session ID cookie
  resave: false, // Prevents session from being saved back to the store unless modified
  saveUninitialized: false, // Prevents uninitialized sessions from being saved
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // MongoDB connection string
    ttl: 24 * 60 * 60, // Session expiration time (in seconds)
  }),
  cookie: {
    secure: process.env.NODE_ENV === "production", // Ensures cookies are sent only over HTTPS in production
    httpOnly: true, // Prevents JavaScript from accessing cookies
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
});

export default sessionMiddleware;
