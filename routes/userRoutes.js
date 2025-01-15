const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;