import express from "express";
import UserOperations from "../controllers/UserOperations.js";

const userRoute = express.Router();

userRoute.route("/register").post(UserOperations.registerUser);
userRoute.route("/login").post(UserOperations.loginUser);

export default userRoute;
