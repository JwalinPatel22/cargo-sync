import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    // if (!process.env.MONGO_URL) {
    //   throw new Error(
    //     "MongoDB URL is missing. Make sure it's defined in the .env file."
    //   );
    // }

    const conn = await mongoose.connect("mongodb://localhost:27017/sihD");
    console.log(
      `Connected to MongoDB Atlas Database at ${mongoose.connection.host}`
    );
  } catch (error) {
    console.error(`MongoDb ERROR : ${error}`);
  }
};

export default connectDB;
