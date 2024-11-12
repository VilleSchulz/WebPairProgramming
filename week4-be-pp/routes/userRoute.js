const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
// GET /users
router.get("/", getAllUsers);

// POST /users
router.post("/",auth, createUser);

// GET /users/:userId
router.get("/:userId",auth, getUserById);

// PUT /users/:userId
router.put("/:userId",auth, updateUser);

// DELETE /users/:userId
router.delete("/:userId",auth, deleteUser);
module.exports = router;