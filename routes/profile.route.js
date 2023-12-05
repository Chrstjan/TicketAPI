const express = require("express");
const {
  fetchUserData,
  fetchUserTickets,
} = require("../controllers/profile.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const router = express.Router();

// Route to fetch user profile info
router.get("/profile", verifyToken, fetchUserData);
router.get("/userTickets", verifyToken, fetchUserTickets);

module.exports = router;
