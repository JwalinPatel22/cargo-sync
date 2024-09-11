const mongoose = require("mongoose");

const IndividualSchema = new mongoose.Schema({
  address: { type: [String], required: true },
  parcels: {type: [mongoose.Schema.Types.ObjectId]}
});

export const Individual = mongoose.model("Individual", IndividualSchema);
