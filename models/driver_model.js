import mongoose from "mongoose";
import User from "./base_user_model.js";

const DriverSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  address: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const Driver = User.discriminator("Driver", DriverSchema);
