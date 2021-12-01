const express = require("express");

const secureRoots = express.Router();
const {
    profile,
	addToRestaurantNotifs
} = require("../helpers/user");

const {sendEmail}=require("../helpers/emails");

secureRoots.get(
    '/testJWT',
    async (req,res,next) => {
	res.json({
	    message: 'you made it!',
	    user: req.user,
	    token: req.query.secret_token
	});
    }
);
secureRoots.get("/profile", profile); //the true path is user/profile
secureRoots.post("/emails",sendEmail); //the true path is user/emails
secureRoots.post("/addToRestaurantNotifs",addToRestaurantNotifs);
module.exports = secureRoots;
