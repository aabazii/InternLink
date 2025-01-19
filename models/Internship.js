const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String },
  experience: { type: String },
  internType: { type: String },
  type: { type: String },
  payment: { type: String },
  deadline: { type: Date },
  location: { type: String },
  logo: { type: String },
});

const Internship = mongoose.model("Internship", internshipSchema);

module.exports = Internship;
