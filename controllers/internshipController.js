// const Internship = require('../models/Internship');

// // Create a new internship
// const createInternship = (req, res) => {
//     // Logic to create a new internship
//     res.send('Create internship');
// };

// // Read all internships
// const getAllInternships = (req, res) => {
//     Internship.find({}, (err, internships) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json(internships);
//     });
//     res.send('Get internships');
// };

// // Read a single internship by ID
// const getInternshipById = (req, res) => {
//     // Logic to get a single internship by ID
//     res.send('Get internship by ID');
// };

// // Update an internship by ID
// const updateInternshipById = (req, res) => {
//     // Logic to update an internship by ID
//     res.send('Update internship by ID');
// };

// // Delete an internship by ID
// const deleteInternshipById = (req, res) => {
//     // Logic to delete an internship by ID
//     res.send('Delete internship by ID');
// };

// module.exports = {
//     createInternship,
//     getAllInternships,
//     getInternshipById,
//     updateInternshipById,
//     deleteInternshipById
// };
const Internship = require("../models/Internship");

class InternshipController {

  async createInternship(req, res) {
    try {
      const internship = new Internship(req.body);
      await internship.save();
      res.status(201).json(internship);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAllInternships(_, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 7;
      const skip = (page - 1) * limit;

      const internships = await Internship.find().skip(skip).limit(limit);
      const totalInternships = await Internship.countDocuments();

      res.render("index", {
        internships,
        currentPage: page,
        totalPages: Math.ceil(totalInternships / limit),
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
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
      const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
}

module.exports = new InternshipController();
