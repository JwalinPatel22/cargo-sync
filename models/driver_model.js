import mongoose from "mongoose";
import User from "./base_user_model.js";

const DriverSchema = new mongoose.Schema({
  licenseNumber: { type: String, required: true, unique: true },
});

export const Driver = User.discriminator("Driver", DriverSchema);
