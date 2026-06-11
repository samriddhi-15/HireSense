import Interview from "../model/interviewSchema.js";
import User from "../model/userSchema.js";
import { evaluateAnswer } from "../ai/evaluateAnswer.js";
import { generateQuestions } from "../services/generateQuestions.js";
import * as pdfParse from "pdf-parse";

export const startInterview = async (req, res) => {
    console.log("START INTERVIEW HIT");
    console.log(req.body);
    try {

        const {
            userId,
            role,
            type,
            level,
            difficulty,
            resumeFile,
            jdText
        } = req.body;

        let resumeText = "";

        if (req.files?.resume) {

            const parser = new pdfParse.PDFParse({
                data: req.files.resume.data
            });

            await parser.load();

            const result = await parser.getText();

            resumeText = result.text || "";
        }


        // Generate AI Questions
        const aiQuestions =
            await generateQuestions({

                role,

                experience: level,

                interviewType: type,

                difficulty,

                resumeText,

                jdText
            });
        console.log(
            "AI QUESTIONS:",
            aiQuestions
        );


        // Format for MongoDB
        const formattedQuestions =
            aiQuestions.map((q) => ({

                question: q,

                answer: "",

                score: 0,

                feedback: ""

            }));

        // Create Interview
        const interview =
            await Interview.create({

                userId,

                role,

                type,

                level,

                questions: formattedQuestions

            });

        res.status(201).json({

            success: true,

            interview

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



export const submitAnswer = async (req, res) => {

    try {

        const {
            interviewId,
            questionIndex,
            answer
        } = req.body;

        const interview = await Interview.findById(interviewId);

        if (!interview) {

            return res.status(404).json({

                success: false,

                message: "Interview not found"

            });

        }

        const index = questionIndex;

        interview.questions[index].answer = answer;

        const evaluation =
            await evaluateAnswer(
                interview.questions[index].question,
                answer
            );

        interview.questions[index].score =
            evaluation.score;

        interview.questions[index].feedback =
            evaluation.feedback;

        console.log(
            "INDEX:",
            interview.currentQuestionIndex
        );
        interview.analytics = {
            confidence: Math.round(
                (interview.analytics.confidence + evaluation.confidence) / 2
            ),
            communication: Math.round(
                (interview.analytics.communication + evaluation.communication) / 2
            ),
            technicalAccuracy: Math.round(
                (interview.analytics.technicalAccuracy + evaluation.technicalAccuracy) / 2
            ),
            fluency: Math.round(
                (interview.analytics.fluency + evaluation.fluency) / 2
            ),
            problemSolving: Math.round(
                (interview.analytics.problemSolving + evaluation.problemSolving) / 2
            )
        };

        const answeredQuestions =
            interview.questions.filter(
                q => q.answer && q.answer.trim() !== ""
            );

        const total =
            interview.questions.reduce(
                (acc, q) => acc + (q.score || 0),
                0
            );

        console.log("TOTAL:", total);

        interview.overallScore =
            Math.round(
                total / interview.questions.length
            );

        console.log(
            "OVERALL SCORE:",
            interview.overallScore
        );



        await interview.save(); if (
            answeredQuestions.length ===
            interview.questions.length
        ) {
            console.log("INTERVIEW COMPLETED");
            const user = await User.findById(interview.userId);

            console.log("USER BEFORE:", user);
            if (user) {
                user.practiceTime = (user.practiceTime || 0) + 0.5;

                const today = new Date();
                console.log(
                    "Answered:",
                    answeredQuestions.length,
                    "Total:",
                    interview.questions.length
                );
                if (!user.lastActiveDate) {
                    user.streak = 1;
                } else {
                    const lastDate = new Date(user.lastActiveDate);

                    const diffDays = Math.floor(
                        (today - lastDate) /
                        (1000 * 60 * 60 * 24)
                    );

                    if (diffDays === 1) {
                        user.streak += 1;
                    } else if (diffDays > 1) {
                        user.streak = 1;
                    }
                }

                user.lastActiveDate = today;

                await user.save();
                console.log("USER AFTER SAVE:", user);
            }
        }

        res.status(200).json({

            success: true,

            interview

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};





export const getInterview = async (req, res) => {

    try {

        const interview = await Interview.findById(req.params.id);

        if (!interview) {

            return res.status(404).json({

                success: false,

                message: "Interview not found"

            });

        }

        res.status(200).json({

            success: true,

            interview

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const getLatestInterview =
    async (req, res) => {

        try {

            const { userId } = req.params;

            const interview =
                await Interview.findOne({
                    userId
                }).sort({ _id: -1 });
            if (!interview) {

                return res.status(404).json({
                    success: false,
                    message: "No interview found"
                });

            }

            res.status(200).json({
                success: true,
                interview
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };


export const generateInterviewQuestions = async (req, res) => {
    try {
        const {
            role,
            experience,
            interviewType,
            difficulty,
            resumeText,
            jdText
        } = req.body;

        const questions = await generateQuestions({
            role,
            experience,
            interviewType,
            difficulty,
            resumeText,
            jdText
        });

        res.status(200).json({
            success: true,
            questions,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to generate questions",
        });
    }
};