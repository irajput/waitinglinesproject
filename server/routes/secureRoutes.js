const express = require("express");

const secureRoots = express.Router();
const {
    profile
} = require("../helpers/user");


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
module.exports = secureRoots;
