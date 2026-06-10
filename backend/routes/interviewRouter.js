import express from "express";

import {startInterview, submitAnswer, getInterview, getLatestInterview, generateInterviewQuestions } from "../controller/interviewController.js";

const router = express.Router();

router.post("/start", startInterview);
router.post("/answer", submitAnswer);
router.get("/:id", getInterview);
router.get("/latest/:userId",getLatestInterview);
router.post("/generate-questions", generateInterviewQuestions);

export default router;