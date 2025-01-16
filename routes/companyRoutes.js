const express = require("express");
const companyController = require("../controllers/companyController");

const router = express.Router();

// Create a new company
router.post("/", (req, res) => companyController.createCompany(req, res));

// Get a single company by ID
router.get("/:id", (req, res) => companyController.getCompany(req, res));

// Update a company by ID
router.put("/:id", (req, res) => companyController.updateCompany(req, res));

// Delete a company by ID
router.delete("/:id", (req, res) => companyController.deleteCompany(req, res));

module.exports = router;