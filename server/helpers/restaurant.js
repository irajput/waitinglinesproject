const restaurantModel = require("../models/restaurant");


exports.getRestaurantProfile = async function (req, res, next) {
    let { name } = req.body;
    let restaurant = await restaurantModel.findOne({ name: name });

    try {
      
      return res.status(200).json({
        restaurant: restaurant,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  };