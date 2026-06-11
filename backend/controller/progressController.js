import Interview from "../model/interviewSchema.js";
import User from "../model/userSchema.js";

export const getProgress = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        const interviews = await Interview.find({
            userId
        });

        if (interviews.length === 0) {
            return res.json({
                success: true,
                progress: {
                    communication: 0,
                    technical: 0,
                    problemSolving: 0,
                    confidence: 0,
                    overall: 0,
                    totalInterviews: 0,
                },
            });
        }

        const avg = (field) =>
            Math.round(
                interviews.reduce(
                    (sum, interview) =>
                        sum + interview.analytics[field],
                    0
                ) / interviews.length
            );

        const overall = Math.round(
            interviews.reduce(
                (sum, interview) =>
                    sum + interview.overallScore,
                0
            ) / interviews.length
        );
        console.log("User:", user);
        console.log("Practice Hours:", user?.practiceTime);
        console.log("Streak:", user?.streak);
        res.json({
            success: true,
            progress: {
                communication: avg("communication"),
                technical: avg("technicalAccuracy"),
                problemSolving: avg("problemSolving"),
                confidence: avg("confidence"),
                overall: Math.round(
                    (
                        avg("communication") +
                        avg("technicalAccuracy") +
                        avg("problemSolving") +
                        avg("confidence")
                    ) / 4
                ),
                totalInterviews: interviews.length,
                practiceHours: Math.round(
                    user?.practiceTime  || 0
                ),

                streak: user?.streak || 0,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};