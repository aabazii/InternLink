const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');


// //image upload
// let storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null, './uploads');
//     },
//     filename:function(req,file,cb){
//         cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     },
// });

// let upload = multer({
//     storage: storage,
// }).single('image');



// router.get("/users", (req,res)=> {
//     res.send("All Users");
// });




//userController.getAllUsers);
// router.post("/user", userController.createUser);
// router.get("/:id", userController.getUserById);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

// module.exports = router;



//Create a new company
router.post("/user", (req, res) => userController.createUser(req, res));

// Get a single company by ID
router.get("/:id", (req, res) => userController.getUserById(req, res));

// Update a company by ID
router.put("/:id", (req, res) => userController.updateUser(req, res));

// Delete a company by ID
router.delete("/:id", (req, res) => userController.deleteUser(req, res));

module.exports = router