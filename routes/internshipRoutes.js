const express = require("express");
const internshipController = require("../controllers/internshipController");
const router = express.Router();

// Create a new internship
router.post("/", (req, res) => internshipController.createInternship(req, res));

// Get all internships
router.get("/", (req, res) => internshipController.getAllInternships(req, res));


//Get a single internship by ID
router.get("/:id", (req, res) =>
  internshipController.getInternshipById(req, res)
);

// Update an internship by ID
router.put("/:id", (req, res) =>
  internshipController.updateInternship(req, res)
);

// Delete an internship by ID
router.delete("/:id", (req, res) =>
  internshipController.deleteInternship(req, res)
);





module.exports = router;
