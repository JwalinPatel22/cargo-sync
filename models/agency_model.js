import mongoose from "mongoose";
import User from "./base_user_model.js";

const AgencySchema = new mongoose.Schema({
  agencyName: { type: String, required: true },
  registerationId: { type: String, required: true },
  vehicle: { type: [mongoose.Schema.Types.ObjectId] },
});

export const Agency = User.discriminator("Agency", AgencySchema);
