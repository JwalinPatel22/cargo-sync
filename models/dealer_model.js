import mongoose from "mongoose";
import User from "./base_user_model.js";

const DealerSchema = new mongoose.Schema({
  agencyName: { type: String, required: true },
  registerationId: { type: String, required: true },
  address: { type: String, required: true },
  vehicle: { type: [mongoose.Schema.Types.ObjectId] },
});

export const Dealer = User.discriminator("Dealer", DealerSchema);
