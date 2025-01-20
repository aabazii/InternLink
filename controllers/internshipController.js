const Internship = require("../models/Internship");
const multer = require("multer");
const path = require("path");
const Company = require('../models/Company');
const sharp = require("sharp");


// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

class InternshipController {
  async createInternship(req, res) {
    try {

      const internship = new Internship({
        ...req.body,
        logo: req.file ? req.file.filename : null,
      });
      await internship.save();

      const company = await Company.findById(req.body.companyId);
      if (company) {
        company.internshipsCreated.push(internship._id);
        await company.save();
      }
      

      return res.send(`
        <script>
          alert("Internship was created successfully!");
          window.location.href = "/internships/listing";
        </script>
      `);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAllInternships(req, res) {
    try {
      const internships = await Internship.find();
      res.render("job-listings", { internships });
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
      return res.send(`
        <script>
          alert("Internship was deleted successfully!");
          window.location.href = "/";
        </script>
      `);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async searchInternships(req, res) {
    try {
      const { searchText, city, jobType, payment, page = 1, sortBy } = req.query;
      const query = {};
      const limit = 10;
      const skip = (page - 1) * limit;
      const sortOptions = {};

      if (searchText) {
        query.name = new RegExp(searchText, "i");
      }

      if (city) {
        query.location = city;
      }

      if (jobType && typeof jobType === 'string') {
        query.internType = { $in: jobType.split(",") };
      }

      if(payment){
        query.payment = payment
      }

      if (sortBy) {
        sortOptions.name = sortBy === 'asc' ? 1 : -1;
      }

      const internships = await Internship.find(query).limit(limit).skip(skip);
      const totalInternships = await Internship.countDocuments(query);
      const totalPages = Math.ceil(totalInternships / limit);

      const queryString = Object.keys(req.query)
        .filter(key => key !== 'page')
        .map(key => `${key}=${req.query[key]}`)
        .join('&');

      res.render("job-listings", { internships, currentPage: page, totalPages, totalInternships, queryString });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
module.exports = { InternshipController: new InternshipController(), upload,  };
