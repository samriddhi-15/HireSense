import express from "express";
import { forgotPassword, logIn, resetPassword, signUp, updatePractice } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.put("/resetPassword/:id", resetPassword);
userRouter.post("/update-practice", updatePractice);


export default userRouter;