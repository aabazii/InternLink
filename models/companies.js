const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  companyLocation: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter a phone number."],
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  email: {
    type: String,
    required: [true, "Please enter an E-mail."],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid E-mail."],
  },
  reviews: [
    {
      reviewText: {
        type: String,
        required: true,
      },
    },
  ],
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
