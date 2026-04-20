import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGO_URL) {
        console.warn("⚠️  Warning: MONGO_URL is not defined in environment variables. Database connection skipped.");
        return;
    }

    try {
        mongoose.connection.on("connected", () => console.log("✅ Database connection established"));
        mongoose.connection.on("error", (err) => console.error("❌ Database connection error:", err));

        await mongoose.connect(`${process.env.MONGO_URL}/mern-auth`);
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
    }
} 

export default connectDB;
