const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: {
    type: String,
    required: [true, "Please enter the company name."],
  },
  location: {
    type: String,
    required: [true, "Please enter the company location."],
  },
  email: {
    type: String,
    required: [true, "Please enter an E-mail."],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid E-mail."],
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
    minlength: [6, "Minimum password length is 6 characters."],
  },
});

//Password hashing
companySchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login company
companySchema.statics.login = async function (email, password) {
  const company = await this.findOne({ email });
  if (company) {
    const auth = await bcrypt.compare(password, company.password);
    if (auth) {
      return company;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

const Company = mongoose.model("Company", companySchema);

module.exports = Company;