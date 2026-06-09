import Interview from "../model/interviewSchema.js";

export const getDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    const interviews = await Interview.find({ userId });

    if (!interviews.length) {
      return res.json({
        success: true,
        dashboard: {
          interviews: 0,
          averageScore: 0,
          practiceHours: 0,
          skillGrowth: 0,
          streak: 0,
          mockTests: 0,
          skillsMastered: 0,
        },
      });
    }

    const averageScore = Math.round(
      interviews.reduce(
        (sum, i) => sum + i.overallScore,
        0
      ) / interviews.length
    );

    const avgCommunication = Math.round(
      interviews.reduce(
        (sum, i) => sum + i.analytics.communication,
        0
      ) / interviews.length
    );

    res.json({
      success: true,
      dashboard: {
        interviews: interviews.length,
        averageScore,
        practiceHours: interviews.length * 0.5,
        skillGrowth: avgCommunication,
        streak: 28,
        mockTests: interviews.length,
        skillsMastered: interviews.length * 4,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};