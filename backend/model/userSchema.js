import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname: { type: String, default: "" },
    lname: { type: String, default: "" },
    phone: { type: Number, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    practiceTime: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: null }
})

const userDataSchema = mongoose.model("hireSense", userSchema);

export default userDataSchema;          