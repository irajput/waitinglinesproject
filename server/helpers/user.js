const models = require("../models/models");
const jwt = require("jsonwebtoken");
const restaurantModel = require("../models/restaurant");



exports.profile = async function (req, res, next) {

    const token = req.headers.secret_token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);    
    let user = await models.User.findOne({ _id: decodedToken.user._id });
    try {
        return res.status(200).json({
            user: user,
        });
      } catch (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
}

exports.addToRestaurantNotifs = async function (req, res, next) {
  let { restaurantName } = req.body;
  console.log(restaurantName)
  let restaurant = await restaurantModel.findOne({ name: restaurantName });
  const token = req.headers.secret_token;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);    
  restaurant.studentIDs.push(decodedToken.user._id);
  try {
      return res.status(200).json({
          restaurant: restaurant,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
}
