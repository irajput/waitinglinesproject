const restaurantModel = require("../models/restaurant");
const models = require("../models/models");

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
    restaurant = await restaurantModel.findOne({ name: name });

    try {
    
      return res.status(200).json({
        message:"Successfully updated crowdedness rating",
        restaurant:restaurant
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  const {sendEmail}=require("./emails");

  exports.sendAllEmails = async function (req, res, next) {
    let { name } = req.body;
    let restaurant = await restaurantModel.findOne({ name: name });
    for (id of restaurant.studentIDs) {
      
      try{
        let user = await models.User.findOne({ _id: id });
        //console.log(user);
        sendEmail(user.email, name);
        //remove user's notified restaurants
        user = await models.User.findOneAndUpdate({ _id: id },{followingRestaurants:[]});

      }
      catch(err){
        console.log("skipping",id)
      }
     
    }
    //remove all of the ids from restaurant
    updatedRestaurant = await restaurantModel.findOneAndUpdate({ name: name },{studentIDs:[]});
    try {
    
      return res.status(200).json({
        restaurant:updatedRestaurant
            });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
  
