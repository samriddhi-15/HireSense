import mongoose from "mongoose";

const dbConnect = async()=>{
    try {
        await mongoose.connect("mongodb+srv://samriddhi:samriddhi@cluster0.sbqsvkq.mongodb.net/samriddhi");
        console.log("Database is connected successfully");
    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;