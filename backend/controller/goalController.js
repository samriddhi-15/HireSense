import Goal from "../model/goalSchema.js";

export const getGoals = async (req, res) => {
    try {

        const { userId } = req.params;

        const goals = await Goal.find({ userId });

        res.json({
            success: true,
            goals,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};
export const createGoal = async (req, res) => {
    try {

        const goal = await Goal.create(req.body);

        res.status(201).json({
            success: true,
            goal,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};

export const updateGoal = async (req, res) => {
    try {

        const goal = await Goal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            goal,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};

export const deleteGoal = async (req, res) => {
    try {

        await Goal.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Goal deleted",
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};