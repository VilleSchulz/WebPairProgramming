const express = require('express')
const router = express.Router();


// ROUTES
const {
    getAllTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour,
  } = require("./controllers/tourControllers"); 
  // GET /tours
  app.get("/", getAllTours);
  
  // POST /tours
  app.post("/", createTour);
  
  // GET /tours/:tourId
  app.get("/:tourId", getTourById);
  
  // PUT /tours/:tourId
  app.put("/:tourId", updateTour);
  
  // DELETE /tours/:tourId
  app.delete("/:tourId", deleteTour);
  