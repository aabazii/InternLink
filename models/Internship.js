const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
  internType: { type: String, required: true },
  payment: { type: String, required: true },
  deadline: { type: Date, required: true },
  location: { type: String, required: true },
  logo: {type: String, required: true}
});

const Internship = mongoose.model("Internship", internshipSchema);

module.exports = Internship;
