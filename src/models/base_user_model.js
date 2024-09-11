// models/users/user.js
import mongoose from "mongoose";
const options = { discriminatorKey: "role", collection: "users" };

// Base User Schema
const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    address: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["Organization", "Driver", "User"],
    },
    createdAt: { type: Date, default: Date.now },
  },
  options
);

export default mongoose.model("User", UserSchema);
