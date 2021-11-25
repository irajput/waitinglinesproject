const restaurantModel = require("../models/restaurant");

exports.createRestaurant = async function (req, res, next) {
  let {name, studentIDs, crowdednessRating, openTime, closeTime,historicalData}=req.body;
  const restaurant = new restaurantModel({
    name,
    studentIDs,
    crowdednessRating,
    openTime,
    closeTime,
    historicalData,
    
  });

  try {
    await restaurant.save();
    return res.status(200).json({
      restaurant: restaurant,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

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