const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/user.js");

const {
  createBookings,
  getBookings,
} = require("../controllers/bookingController");

// Protected routes (user must be logged in)
router.route("/").get(isLoggedIn, getBookings).post(isLoggedIn, createBookings);

module.exports = router;
