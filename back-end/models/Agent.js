const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    status: { type: String, default: "never_connected" },
    id: { type: String, trim: true },
    os: { type: String },
    ip: { type: String },
    dateAdd: { type: String },
    version: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", AgentSchema);


