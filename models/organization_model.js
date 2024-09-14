import mongoose from "mongoose";
import User from "./base_user_model.js";

const OrganizationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  parcels: { type: [mongoose.Schema.Types.ObjectId], ref: "Parcel" },
});

export const Organization = User.discriminator(
  "Organization",
  OrganizationSchema
);
