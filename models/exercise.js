const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const exerciseSchema = new Schema({
  imageURL: { type: String, required: true},
  exercise: { type: String, required: true, lowercase: true},
  reps: { type: Number, required: true, default: 3},
  weight: { type: Number, default: 0}
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;