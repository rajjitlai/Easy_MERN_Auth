import mongoose, { mongo } from "mongoose";

const connectDB = async() => {
    mongoose.connection.on("connected", () => console.log("Database connection established"))

    await mongoose.connect(`${process.env.MONGO_URL}/mern-auth`)
} 

export default connectDB;
