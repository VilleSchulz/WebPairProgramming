const auth = require('../middleware/auth');

const express = require('express')
const router = express.Router();


// ROUTES
const {
    getAllTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour,
  } = require("../controllers/tourControllers"); 
  // GET /tours
  router.get("/", getAllTours);
  
  // POST /tours
  router.post("/",auth, createTour);
  
  // GET /tours/:tourId
  router.get("/:tourId",auth, getTourById);
  
  // PUT /tours/:tourId
  router.put("/:tourId",auth, updateTour);
  
  // DELETE /tours/:tourId
  router.delete("/:tourId",auth, deleteTour);
  module.exports = router;