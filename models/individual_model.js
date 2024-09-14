import mongoose from "mongoose";
import User from "./base_user_model.js";
const IndividualSchema = new mongoose.Schema({
  parcels: { type: [mongoose.Schema.Types.ObjectId], ref: "Parcel" },
});

export const Individual = User.discriminator("Individual", IndividualSchema);
