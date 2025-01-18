const User = require("../models/User");
const Company = require("../models/Company");
const bcrypt = require("bcryptjs");

class AuthController {
    async registerUser(req, res) {
      const { firstName, lastName, email, password, phoneNumber, collegeName, dateOfBirth } = req.body;

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

  //async createUser(req, res) {
  //     try {
  //       const user = new User(req.body);
  //       await user.save();
  //       res.status(201).json(user);
  //     } catch (err) {
  //       res.status(400).json({ error: err.message });
  //     }
  //   }
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
      req.flash("success", "Logged in successfully");
      res.redirect("/profile");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/login");
    }
  }

  async loginCompany(req, res) {
    const { email, password } = req.body;

    try {
      const company = await Company.findOne({ email });

      if (!company) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }

      const isMatch = await bcrypt.compare(password, company.password);

      if (!isMatch) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }

      req.session.company = company;
      req.flash("success", "Logged in successfully");
      res.redirect("/");
    } catch (error) {
      req.flash("error", "Someting went wrong, try again");
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
