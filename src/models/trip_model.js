const e = require("express");
const mongoose = require("mongoose");

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

  truck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Truck",
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
});
