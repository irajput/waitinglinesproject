const express = require("express");
const router = express.Router();
//const authorize = require("../helpers/authMiddleware");
const {
    getRestaurantProfile,
    createRestaurant
} = require("../helpers/restaurant");


router.get("/profile", getRestaurantProfile); //the true path is restaurant/profile
router.post("/create",createRestaurant)

module.exports = router;
