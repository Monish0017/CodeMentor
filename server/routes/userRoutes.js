import { Router } from "express";
import {
  userLogin,
  userRegister,
  userLogout,
  googleAuth,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../controllers/UserController.js";

const userRoute = Router();

userRoute.post("/auth/register", userRegister);
userRoute.post("/auth/login", userLogin);
userRoute.post("/auth/google", googleAuth);
userRoute.get("/auth/logout", userLogout);
userRoute.get("/user/profile", getUserProfile);
userRoute.put("/user/profile", updateUserProfile);
userRoute.delete("/user/delete", deleteUserAccount);

export default userRoute;
