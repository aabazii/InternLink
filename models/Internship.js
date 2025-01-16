const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
  internType: { type: String, required: true },
  payment: { type: String, required: true },
  deadline: { type: Date, required: true },
  location: { type: String, required: true },
  // email: {
  //   type: String,
  //   required: [true, "Please enter an E-mail."],
  //   unique: true,
  //   lowercase: true,
  //   validate: [isEmail, "Please enter a valid E-mail."],
  // },
});

const Internship = mongoose.model("Internship", internshipSchema);

module.exports = Internship;
