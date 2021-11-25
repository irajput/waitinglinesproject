const express = require("express");
const router = express.Router();
//const authorize = require("../helpers/authMiddleware");
const {
    getRestaurantProfile,
} = require("../helpers/restaurant");


router.get("/profile", getRestaurantProfile);


module.exports = router;
