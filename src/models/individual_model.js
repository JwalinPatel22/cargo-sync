import mongoose from "mongoose";
const IndividualSchema = new mongoose.Schema({
  address: { type: [String], required: true },
  parcels: { type: [mongoose.Schema.Types.ObjectId], ref: "Parcel" },
});

export const Individual = mongoose.model("Individual", IndividualSchema);
