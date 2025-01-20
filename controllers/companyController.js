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
      const company = await Company.findById(req.params.id);
      if (!company) {
        return res.status(404).json({ message: "Cannot find Company" });
      }

      if (req.body.companyName != null) {
        company.companyName = req.body.companyName;
      }
      if (req.body.location != null) {
        company.lastName = req.body.lastName;
      }
      if (req.body.email != null) {
        company.email = req.body.email;
      }

      const updatedCompany = await company.save();
      req.session.company = updatedCompany; // Update session data

      res.redirect('/logout');
    } catch (err) {
      res.send(err);
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
      const company = await Company.findById(req.session.company._id).populate('internshipsCreated');
      if (!company) {
        return res.redirect("/login");
      }
      res.render("dashboard", { company });
    } catch (err) {   
      res.redirect("/login");
    }
  }
}

module.exports = new CompanyController();