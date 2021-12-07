const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tour.controller");

router.post("/", auth, adminAuth, createTour);

router.get("/list", getTours);

router.get("/:tourId", getTour);

router.put("/:tourId", updateTour);

router.delete("/:tourId", auth, adminAuth, deleteTour);

module.exports = router;
