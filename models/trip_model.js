import mongoose from "mongoose";

const TripSchema = new mongoose.Schema({
  tripRoute: {
    startLocation: {
      type: String,
      required: true,
    },
    endLocation: {
      type: String,
      required: true,
    },
  },

  tripDistance: {
    type: Number,
    required: true,
  },

  estimatedTime: {
    type: Number,
    required: true,
  },

  parcels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parcel",
    },
  ],

  currentLocation: {
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  },

  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },

  tripStatus: {
    type: String,
    enum: ["Scheduled", "In Progress", "Completed", "Cancelled"],
    default: "Scheduled",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Trip = mongoose.model("Trip", TripSchema);
