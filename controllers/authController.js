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
        return res.send(`
          <script>
            alert("User exists with this email!");
            window.location.href = "/register";
          </script>
        `);
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
      res.redirect("/login");
    } catch (error) {
      res.redirect("/register");
    }
  }

  async registerCompany(req, res) {
    const { companyName, location, email, password } = req.body;

    try {
      const companyExists = await Company.findOne({ email });

      if (companyExists) {
        return res.send(`
          <script>
            alert("Company exists with this email!");
            window.location.href = "/register";
          </script>
        `);
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
      return res.send(`
        <script>
          alert("Wrong email or password!");
          window.location.href = "/login";
        </script>
      `);
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch || !user) {
        return res.send(`
          <script>
            alert("Wrong email or password!");
            window.location.href = "/login";
          </script>
        `);
      }

      req.session.user = user;     
      res.redirect("/profile");
    } catch (error) {
      res.send(error);
    }
  }

  async loginCompany(req, res) {
    try {
      const company = await Company.findOne({ email: req.body.email });
      const isMatch = await bcrypt.compare(req.body.password, company.password);
      if (!company || !isMatch) {
        return res.send(`
          <script>
            alert("Invalid email or password");
            window.location.href = "/login";
          </script>
        `);
      }
      req.session.company = company; // Ensure this line sets the session data
      res.redirect("/");
    } catch (err) {
      res.send(`
        <script>
          alert("An error occurred: ${err.message}");
          window.location.href = "/login";
        </script>
      `);
    }
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.redirect("/");
      }
      res.clearCookie("connect.sid");
      return res.send(`
        <script>
          alert("Loged out successfully");
          window.location.href = "/";
        </script>
      `);
    });
  }
}

module.exports = new AuthController();
