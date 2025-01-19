const User = require("../models/User");
const Company = require("../models/Company");
const bcrypt = require("bcryptjs");
const alert = require ('alert');

class AuthController {
  async registerUser(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      collegeName,
      dateOfBirth,
    } = req.body;

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        req.flash("error", "User already exists with this email");
        return res.redirect("/register");
      }

      const user = new User({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        collegeName,
        dateOfBirth,
      });

      await user.save();
      req.flash("success", "User registered successfully");
      res.redirect("/login");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/register");
    }
  }

  async registerCompany(req, res) {
    const { companyName, location, email, password } = req.body;

    try {
      const companyExists = await Company.findOne({ email });

      if (companyExists) {
        req.flash("error", "Company already exists with this email");
        return res.redirect("/register");
      }

      const company = new Company({
        companyName,
        location,
        email,
        password,
      });

      await company.save();
      req.flash("success", "Company registered successfully");
      res.redirect("/login");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/register");
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }

      req.session.user = user;
      alert("Successfully loged in");
      req.flash("success", "Logged in successfully");
      res.redirect("/profile");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/login");
    }
  }

  async loginCompany(req, res) {
    try {
      const company = await Company.findOne({ email: req.body.email });
      const isMatch = await bcrypt.compare(req.body.password, company.password);
      if (!company || !isMatch) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }
      req.session.company = company; // Ensure this line sets the session data
      res.redirect("/");
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/login");
    }
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.redirect("/");
      }
      res.clearCookie("connect.sid");
      res.redirect("/login");
    });
  }
}

module.exports = new AuthController();
