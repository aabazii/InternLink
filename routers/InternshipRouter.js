const express = require('express');
const internshipController = require('../controllers/internshipController');

const router = express.Router();

router.get('/', internshipController.getAllInternships);

router.get('/:name',(req,res) =>{

});

module.exports = router;