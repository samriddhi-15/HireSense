import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            default: "Technical",
        },

        dueDate: String,

        done: {
            type: Boolean,
            default: false,
        },

        icon: {
            type: String,
            default: "🎯",
        },
    },
    {
        timestamps: true,
    }
);

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;