const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name."],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name."],
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
    minlength: [6, "Minimun password length is 6 characters."],
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

  collegeName: {
    type: String,
    required: [true, "Please enter your college name."],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please enter your date of birth."],
  }
});

// fire a function before DOC saved to DB
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

module.exports = mongoose.model("User", userSchema);
