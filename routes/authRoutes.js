const { guestRoute, protectedRoute } = require('../middlewares/authMiddleware.js');
const express = require("express");
const authController = require("../controllers/authController");
const User = require('../models/User.js');
const userController = require('../controllers/userController');

const router = express.Router();

router.get("/register", guestRoute, (req, res) => {
  res.render("register");
});

router.post("/register/user", (req, res) => authController.registerUser(req, res));
router.post("/register/company", (req, res) => authController.registerCompany(req, res));

router.get("/login", guestRoute,  (req, res) => {
  res.render("login", {User});
});

router.post("/login/user", (req, res) => authController.loginUser(req, res));
router.post("/login/company", (req, res) => authController.loginCompany(req, res));

router.get("/logout", (req, res) => authController.logout(req, res));

router.get('/profile', protectedRoute, (req, res)=> userController.getUserProfile(req,res));



module.exports = router;