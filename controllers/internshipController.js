const { response } = require("express");
const Internships = require("../models/Internships");

const getAllInternships = (req, res) => {
  Internships.find()
    .then((result) => {
      console.log(result);
      res.render("home", {});
    })
    .catch((err) => {
      console.log(err);
    });
};

const getInternshipsByName = (req, res) => {};

module.exports = { getAllInternships, getInternshipsByName };
