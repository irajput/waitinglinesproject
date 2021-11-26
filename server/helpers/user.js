const models = require("../models/models");
const jwt = require("jsonwebtoken");



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
