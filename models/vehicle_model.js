import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
  licensePlateNumber: { type: String, required: true, unique: true },
  weightCapacity: { type: Number, required: true },
  dimensions: { type: [Number], required: true },
  vehicleCategory: {
    type: String,
    enum: ["Light Commercial Vehicle", "Medium Duty Truck", "Heavy Duty Truck"],
  },
});

export const Vehicle = mongoose.model("Vehicle", VehicleSchema);
