// server/index.js

const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const models = require("./models/models.js");
const jwt = require("jsonwebtoken");
const passJwt = require('passport-jwt');
const JWTStrategy = passJwt.Strategy;
const ExtractJWT = passJwt.ExtractJwt;
const PORT = process.env.PORT || 3001;

const app = express();
const restuarantRoutes = require("./routes/restaurant");


const USERNAMEFIELD = 'email';
const PASSWORDFIELD = 'password';

require('dotenv').config();

app.use(passport.initialize());



const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
    console.log("Could not connect to database. Exiting...");
    process.exit(1);
  }
};

////////////////////////////////////////////////////////
// Middleware code, for use by passport at the moment //
////////////////////////////////////////////////////////

passport.use(
    'signup',
    new LocalStrategy(
	{
	    usernameField: USERNAMEFIELD,
	    passwordField: PASSWORDFIELD,
	},
	async (email,password,done) => {
	    try{
		//try to make a model
		const newUser = await models.User.create(
		    {email,password});
		return done(null,newUser);
	    } catch (error) {
		done(error); // TODO change this out, don't dump our errors to the world!
	    }
	}
    )
);

passport.use(
    'login',
    new LocalStrategy(
	{
	    usernameField: USERNAMEFIELD,
	    passwordField: PASSWORDFIELD,
	},
	async (email, password, done) => {
	    try {
		const user = await models.User.findOne({email});
		// show the same error regardless as a security measure.
		const errMessage = "No such user or incorrect password"
		if(!user){
		    return done(null,false,{message:errMessage});
		}
		const isUser = await user.isRightPassword(password);
		if(!isUser){
		    return done(null,false,{message:errMessage});
		}
		return done(null,user, {message: "success"});
	    } catch (error) {
		return done(error);
	    }
	}
    )
);

passport.use(
    'jwt',
    new JWTStrategy(
	{
	    secretOrKey: process.env.JWT_SECRET,
	    jwtFromRequest: ExtractJWT.fromHeader('secret_token'),
	},
	async (token,next) => {
	    console.log('here');
	    try{
		return next(null,token.user);
	    } catch (error) {
		next(error);
	    }
	}
    )
);

 

//////////////////
// Routing code //
//////////////////

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post(
    "/signup",
    passport.authenticate('signup',{session: false}),
    async (req,res,next) => {
	res.json({
	    message: "Signup worked",
	});
    }
);

app.post(
    "/login",
    async (req,res,next) => {
	await passport.authenticate('login',
	    (err,user,info) => {
		try{
		    if(err || !user){
			console.log(err);
			return new Error("An authentication error occured");
		    }
		    req.login(
			user,
			{session : false},
			async (error) => {
			    if(error) return next(error);
			    const body = {_id: user._id}
			    const token = jwt.sign({user:body},process.env.JWT_SECRET);
			    return res.json({ token });
			}
		    );
		} catch (error){
		    return next(error);
		}
	    }
			     )(req,res,next);
    }
)
//////////////////
// secure roots //
//////////////////

const secureRoots = express.Router();

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

app.use('/user',passport.authenticate('jwt',{session : false}), secureRoots);
    
app.use('/restaurant',restuarantRoutes); //for restaurant routes/profile


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

connectToDB();
