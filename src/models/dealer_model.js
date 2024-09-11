import mongoose from "mongoose";

const DealerSchema = new mongoose.Schema({
  address: { type: [String], required: true },
  truck: { type: [mongoose.Schema.Types.ObjectId], ref: "Truck" },
});

export const Dealer = mongoose.model("Dealer", DealerSchema);
