import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({

  question: {
    type: String
  },

  answer: {
    type: String,
    default: ""
  },

  score: {
    type: Number,
    default: 0
  },

  feedback: {
    type: String,
    default: ""
  }

});

const interviewSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  role: {
    type: String,
    default: "Frontend Engineer"
  },

  type: {
    type: String,
    default: "Technical"
  },

  level: {
    type: String,
    default: "Intermediate"
  },

  status: {
    type: String,
    enum: ["ongoing", "completed"],
    default: "ongoing"
  },

  currentQuestionIndex: {
    type: Number,
    default: 0
  },

  questions: [answerSchema],

  overallScore: {
    type: Number,
    default: 0
  },

  resumeText: {
    type: String,
    default: ""
  },

  jdText: {
    type: String,
    default: ""
  },

  interviewMode: {
    type: String,
    enum: [
      "generic",
      "resume",
      "jd",
      "personalized"
    ],
    default: "generic"
  },

  analytics: {

    confidence: {
      type: Number,
      default: 0
    },

    communication: {
      type: Number,
      default: 0
    },

    technicalAccuracy: {
      type: Number,
      default: 0
    },

    fluency: {
      type: Number,
      default: 0
    },

    problemSolving: {
      type: Number,
      default: 0
    }

  },

  startedAt: {
    type: Date,
    default: Date.now
  },

  completedAt: {
    type: Date
  }

});

export default mongoose.model("Interview", interviewSchema);