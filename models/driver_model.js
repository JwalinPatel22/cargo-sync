import mongoose from "mongoose";
import User from "./base_user_model.js";

const DriverSchema = new mongoose.Schema({
  licenseNumber: { type: String, required: true, unique: true },
  vehicleCategory: {
    type: String,
    enum: ["Light Commercial Vehicle", "Medium Duty Truck", "Heavy Duty Truck"],
    required: true,
  },
});

export const Driver = User.discriminator("Driver", DriverSchema);
