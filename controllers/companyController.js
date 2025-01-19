const Company = require("../models/Company");
const bcrypt = require('bcrypt');

class CompanyController {

  async createCompany(req, res) {
    try {
      const company = new Company(req.body);
      await company.save();
      res.status(201).json(company);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAllCompany(_, res) {
    try {
      console.log("Fetching all companys...");
      const companys = await Company.find();
      console.log("Companys found:", companys);
      res.status(200).json(companys);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getCompanyById(req, res) {
    try {
      const company = await Company.findById(req.params.id);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      res.status(200).json(company);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateCompany(req, res) {
    try {
      const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      res.status(200).json(company);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteCompany(req, res) {
    try {
      const company = await Company.findByIdAndDelete(req.params.id);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      res.status(200).json({ message: "Company deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getCompanyDashboard(req, res) {
    try {
      const company = await Company.findById(req.session.company._id).populate('internships');
      if (!company) {
        req.flash("error", "Company not found");
        return res.redirect("/login");
      }
      res.render("/dashboard", { company });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/login");
    }
  }
}

module.exports = new CompanyController();