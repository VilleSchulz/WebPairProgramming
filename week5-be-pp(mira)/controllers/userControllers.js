const User = require("../models/userModel");
const mongoose = require("mongoose");

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

// POST /users
const createUser = async (req, res) => {
  try {
    const newUser = await User.create({ ...req.body }); // Spread the req.body object
    if (newUser) {
      res.status(201).json(newUser);
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create user", error: error.message });
  }
};

// GET /users/:userId
const getUserById = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve user", error: error.message });
  }
};

// PUT /users/:userId
const updateUser = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { ...req.body },
      { new: true }
    ); // Spread the req.body object
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      // Handle update failure (e.g., user not found)
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retriseve user", error: error.message });
  }
};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const isDeleted = await User.findOneAndDelete(userId);
    if (isDeleted) {
      res.status(204).send();
    } else {
      // Handle deletion failure (e.g., user not found)
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .staus(500)
      .json({ message: "Failed to delete tour", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
