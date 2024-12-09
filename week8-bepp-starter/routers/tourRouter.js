import express from "express";
const router = express.Router();
import {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} from "../controllers/tourControllers.js";

router.get("/", getAllTours);
router.post("/", createTour);
router.get("/:tourId", getTourById);
router.put("/:tourId", updateTour);
router.delete("/:tourId", deleteTour);
export default router;
