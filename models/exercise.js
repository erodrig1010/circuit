const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const exerciseSchema = new Schema({
  name: { type: String, required: true, lowercase: true},
  imageURL: { type: String, required: true},
  instructions: { type: String},
  equipment: {
    type: String,
    enum : ['Bodyweight', 'Dumbbells', 'Kettlebells', 'Barbell', 'Medicine Ball', 'Resistance Bands'],
    default : 'Bodyweight',
  },
  bodyGroup: {
    type: String,
    enum : ['Upper Body', 'Lower Body', 'Full Body'],
    default : 'Full Body',
  },
  source: String
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;