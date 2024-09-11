import mongoose from "mongoose";
const OrganizationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  parcels: { type: [mongoose.Schema.Types.ObjectId], ref: "Parcel" },
});

export const Organization = mongoose.model("Organization", OrganizationSchema);
