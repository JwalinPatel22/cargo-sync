const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  parcels: { type: [mongoose.Schema.Types.ObjectId] },
});

export const Organization = mongoose.model("Organization", OrganizationSchema);
