import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let isConnected = false;

const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    try {
        if (!process.env.MONGODB_URL) {
            console.error("❌ MONGODB_URL environment variable is not defined");
            return;
        }
        const db = await mongoose.connect(process.env.MONGODB_URL);
        isConnected = db.connections[0].readyState === 1;
        console.log(" ✅ Mongodb Connected");
        return db;
    } catch (e) {
        console.error("❌ Mongodb connection error:", e.message);
    }
};

export default connectDB;
