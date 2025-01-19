const Internship = require("../models/Internship");
const User = require("../models/User");
const bcrypt = require("bcrypt");

class UserController {
  async createUser(req, res) {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Get a user by ID
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Update a user by ID
  async applyForInternship(req, res) {
    try {
      const userId = req.session.user._id; // Assuming user is logged in and session contains user info
      const internshipId = req.params.id;

      // Find the user and internship
      const user = await User.findById(userId);
      const internship = await Internship.findById(internshipId);
      if (!internship) {
        return res.status(404).json({ message: "Cannot find internship" });
      }

      if (!req.session.user) {
        return res.status(401).json({ message: "You need to Log In to Apply" });
      }

      // Add the internship ID to the user's internshipsApplied property
      user.internshipsApplied.push(internshipId);
      await user.save();

      res.status(200).json({ message: "Applied for internship successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Delete a user by ID
  async deleteUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }

      await User.deleteOne({ _id: user._id });
      res.redirect('/logout'); // Redirect to home page after deletion
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  //  Apply for Internship
  async applyForInternship(req, res) {
    try {
      //const userId = req.session.user._id; // Assuming user is logged in and session contains user info
      const internshipId = req.params.id;

      // Find the user and internship
      //const user = await User.findById(userId);
      const internship = await Internship.findById(internshipId);

      if (!req.session.user) {
        return res.status(401).json({ message: "You need to Log In to Apply" });
      }

      // Add the internship ID to the user's internshipsApplied property
      user.internshipsApplied.push(internshipId);
      await user.save();

      //res.status(200).json({ message: "Applied for internship successfully" });
      res.status(200).json({ message: "Applied for internship successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new UserController();
