const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController.js");
const companyController = require("../controllers/companyController");

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register/user", (req, res) => authController.createUser(req, res));
router.post("/register/company", (req, res) => authController.registerCompany(req, res));

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login/user", (req, res) => authController.loginUser(req, res));
router.post("/login/company", (req, res) => authController.loginCompany(req, res));

router.get("/logout", (req, res) => authController.logout(req, res));

module.exports = router;