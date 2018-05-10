const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const circuitSchema = new Schema({
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', min: 2, required: true},],
  sets: { type: Number},
  rest: { type: Number},
  createdby: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Circuit = mongoose.model("Circuit", circuitSchema);

module.exports = Circuit;