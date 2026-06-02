import express from "express";
import { forgotPassword, logIn, resetPassword, signUp } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.put("/resetPassword/:id", resetPassword);



export default userRouter;