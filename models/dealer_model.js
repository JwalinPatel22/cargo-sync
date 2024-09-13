import mongoose from "mongoose";
import User from "./base_user_model.js";

const DealerSchema = new mongoose.Schema({
  address: { type: [String], required: true },
  truck: { type: [mongoose.Schema.Types.ObjectId] },
});

export const Dealer = User.discriminator("Dealer", DealerSchema);
