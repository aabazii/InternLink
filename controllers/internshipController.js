const Internship = require("../models/Internship");
const multer = require("multer");
const path = require("path");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, " /images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

class InternshipController {
  async createInternship(req, res) {
    try {
      const internship = new Internship({
        ...req.body,
        logo: req.file ? req.file.path : null,
      });
      await internship.save();
      res.status(201).json(internship);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAllInternships(req, res) {
    try {
      const internships = await Internship.find();
      res.status(200).json(internships);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getInternshipById(req, res) {
    try {
      const internship = await Internship.findById(req.params.id);
      if (!internship) {
        return res.status(404).json({ error: "Internship not found" });
      }
      res.status(200).json(internship);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateInternship(req, res) {
    try {
      const internship = await Internship.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!internship) {
        return res.status(404).json({ error: "Internship not found" });
      }
      res.status(200).json(internship);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteInternship(req, res) {
    try {
      const internship = await Internship.findByIdAndDelete(req.params.id);
      if (!internship) {
        return res.status(404).json({ error: "Internship not found" });
      }
      res.status(200).json({ message: "Internship deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async searchInternships(req, res) {
    try {
      const { searchText, city, jobType } = req.query;
      const query = {};

      if (searchText) {
        query.name = new RegExp(searchText, "i");
      }

      if (city) {
        query.location = city;
      }

      if (jobType) {
        query.internType = { $in: jobType.split(",") };
      }

      const internships = await Internship.find(query);
      res.render("job-listings", { internships });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
module.exports = { InternshipController: new InternshipController(), upload };
