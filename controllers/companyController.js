const Company = require("../models/Company");

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

  async getAllCompanys(_, res) {
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
}

module.exports = new CompanyController();