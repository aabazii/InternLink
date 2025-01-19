const express = require("express");
const { InternshipController, upload } = require("../controllers/internshipController");

const router = express.Router();

// Create a new internship with file upload
router.post("/", upload.single("logo"), (req, res) => InternshipController.createInternship(req, res));

// Get all internships
router.get("/", (req, res) => InternshipController.getAllInternships(req, res));

// Get a single internship by ID
router.get("/:id", (req, res) => InternshipController.getInternshipById(req, res));

// Update an internship by ID
router.put("/:id", (req, res) => InternshipController.updateInternship(req, res));

//Get internship from Name
router.get("/name/:name", (req, res) => InternshipController.getInternshipByName(req, res));

// Delete an internship by ID
router.delete("/:id", (req, res) => InternshipController.deleteInternship(req, res));



module.exports = router;