const Tour = require("../models/tourModel");
const mongoose = require("mongoose");

// GET /tours
const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find({}).sort({ createdAt: -1 });
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tours" });
  }
};

// POST /tours
const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create({ ...req.body }); // Spread the req.body object
    res.status(201).json(newTour);
  } catch (error) {
    // Handle error (e.g., failed to create tour)
    res
      .status(400)
      .json({ message: "Failed to create tour", error: error.message });
  }
};

// GET /tours/:tourId
const getTourById = async (req, res) => {
  const { tourId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid tour ID" });
  }

  try {
    const tour = await Tour.findById(tourId);
    if (tour) {
      res.status(200).json(tour);
    } else {
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve tour", error: error.message });
  }
};

// PUT /tours/:tourId
const updateTour = async (req, res) => {
  const { tourId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid tour ID" });
  }
  try {
    const updatedTour = await Tour.findOneAndUpdate(
      { _id: tourId },
      { ...req.body },
      { new: true }
    ); // Spread the req.body object

    if (updatedTour) {
      res.status(200).json(updatedTour);
    } else {
      // Handle update failure (e.g., tour not found)
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update tour", error: error.message });
  
  }
};

// DELETE /tours/:tourId
const deleteTour = async (req, res) => {
  const { tourId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid tour ID" });
  }

  try {
    const isDeleted = await Tour.findOneAndDelete({ _id: tourId });
    if (isDeleted) {
      res.status(204).send();
    } else {
      // Handle deletion failure (e.g., tour not found)
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete tour", error: error.message });
    
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
