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
  let { name } = req.query;
 
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

  
  exports.setSlider = async function (req, res, next) {
    let { name, sliderNum } = req.body;
    console.log(sliderNum);
    let restaurant = await restaurantModel.findOneAndUpdate({ name: name },{crowdednessRating:sliderNum});
    try {
    
      return res.status(200).json({
        message:"Successfully updated crowdedness rating",
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  
