import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

class Database {
  static async dbConnection() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection error:", error);
    }
  }
}

export default Database;
