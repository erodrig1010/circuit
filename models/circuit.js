const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const circuitSchema = new Schema({
  exercises: [{
    // { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', min: 2, required: true},
    exercise: { type: String, required: true, lowercase: true},
    reps: { type: Number, required: true},
    weight: { type: Number, default: 0}
  }],
  sets: { type: Number, required: true},
  rest: { type: Number, required: true},
  createdby: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Circuit = mongoose.model("Circuit", circuitSchema);

module.exports = Circuit;