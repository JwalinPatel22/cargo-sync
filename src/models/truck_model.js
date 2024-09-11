const mongoose = require("mongoose");

const TruckSchema = new mongoose.Schema({
  licensePlateNumber: { type: String, required: true, unique: true },
  weightCapacity: { type: Number, required: true },
  dimensions: { type: [Number], required: true },
});

export const Truck = mongoose.model("Truck", TruckSchema);
