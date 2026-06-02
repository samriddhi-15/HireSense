import dotenv from "dotenv";
dotenv.config();

import express from "express";
import dbConnect from "./connect/dbConnect.js";
import userRouter from "./routes/userRouter.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import interviewRouter from "./routes/interviewRouter.js";

const app = express();
app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://hiresense-gold.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(fileUpload());
app.use("/api/interviews", interviewRouter);

const port = process.env.PORT || 4000;
dbConnect();

app.use("/hireSense", userRouter);

app.listen(port, () => {
    console.log(`The backend is running successfully on port: ${port}`)
})