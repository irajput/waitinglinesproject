const express = require("express");
const router = express.Router();
//const authorize = require("../helpers/authMiddleware");
const {
    getRestaurantProfile,
    createRestaurant,
    setSlider
} = require("../helpers/restaurant");


router.get("/profile", getRestaurantProfile); //the true path is restaurant/profile
router.post("/create",createRestaurant);
router.post("/updateSlider",setSlider);

module.exports = router;
