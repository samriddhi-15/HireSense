import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname: {type: String, default: ""},
    lname: {type: String, default: ""},
    phone: {type: Number, default: ""},
    email:{type: String, default: ""},
    password:{type:String, default:""}
})

const userDataSchema = mongoose.model("hireSense", userSchema);

export default userDataSchema;          