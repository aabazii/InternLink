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
  async updateUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Cannot find user" });
      }

      if (req.body.firstName != null) {
        user.firstName = req.body.firstName;
      }
      if (req.body.lastName != null) {
        user.lastName = req.body.lastName;
      }
      if (req.body.email != null) {
        user.email = req.body.email;
      }
      if (req.body.dateOfBirth != null) {
        user.dateOfBirth = req.body.dateOfBirth;
      }
      if (req.body.collegeName != null) {
        user.collegeName = req.body.collegeName;
      }

      const updatedUser = await user.save();
      res.redirect('/');
    } catch (err) {
      res.send(err);
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
      res.redirect('/'); // Redirect to home page after deletion
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  //  Apply for Internship
  async applyForInternship(req, res) {
    try {
      if (!req.session.user) {
        return res.send(`
          <script>
            alert("You need to login to apply!");
            window.location.href = "/login";
          </script>
        `);
      }
  
      const userId = req.session.user._id; // Assuming user is logged in and session contains user info
      const internshipId = req.params.id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Cannot find user" });
      }
  
      const internship = await Internship.findById(internshipId);
      if (!internship) {
        return res.status(404).json({ message: "Cannot find internship" });
      }
  
      // Add the internship ID to the user's internshipsApplied property
      user.internshipsApplied.push(internshipId);
      await user.save();
  
      return res.send(`
        <script>
          alert("Applied for the Internship!");
          window.location.href = "/internships/listing";
        </script>
      `);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getUserProfile(req, res) {
    try {
      const user = await User.findById(req.session.user._id).populate('internshipsApplied');
      if (!user) {
        return res.status(404).json({ message: "Cannot find user" });
      }
      res.render('profile', { user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new UserController();
