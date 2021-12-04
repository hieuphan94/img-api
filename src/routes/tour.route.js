const express = require("express");
const router = express.Router();

const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tour.controller");

router.post("/", createTour);

router.get("/list", getTours);

router.get("/:tourId", getTour);

router.put("/:tourId", updateTour);

router.delete("/:tourId", deleteTour);

module.exports = router;
