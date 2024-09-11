import mongoose from "mongoose";
import  User  from "./base_user_model.js";
const IndividualSchema = new mongoose.Schema({
  address: { type: String, required: true },
  parcels: { type: [mongoose.Schema.Types.ObjectId], ref: "Parcel" },
});

export const Individual = User.discriminator("Individual", IndividualSchema);
