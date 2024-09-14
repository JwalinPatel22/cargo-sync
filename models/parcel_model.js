import mongoose from "mongoose";

const ParcelSchema = new mongoose.Schema({
  description: { type: String },
  quantity: { type: Number, required: true, default: 1 },
  weight: { type: Number, required: true },
  dimensions: {
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "senderModel",
  },
  senderModel: {
    type: String,
    required: true,
    enum: ["Individual", "Organization"],
  },
  destination: { type: String, required: true },
  status: { type: String, enum: ["Pending", "In Transit", "Delivered"] },
});

export const Parcel = mongoose.model("Parcel", ParcelSchema);
