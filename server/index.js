// server/index.js

const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const models = require("./models/models.js");
const statistics = require("./helperModules/stats.js");
const cron = require('node-cron');
const jwt = require("jsonwebtoken");
const passJwt = require('passport-jwt');
const JWTStrategy = passJwt.Strategy;
const ExtractJWT = passJwt.ExtractJwt;
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(passport.initialize());
app.use(cors());
// JS is frequently stringly typed, so we allow for these codes to be used to tell us the legal resturants
const RESTURAUNTCODES = ["Rendezvous","Study","Feast","BCafe","DeNeve","Epic", "BPlate"];

/////////////////////////////
// Variable Initialization //
/////////////////////////////

//list all the routes here
const restaurantRoutes = require("./routes/restaurant");
const secureRoots = require("./routes/secureRoutes");

// an associated list of the current chunks that we're working with. This is small enough and frequently used enough that putting it in the db wouldn't make sense. A "chunk" is defined as all the requests we see for that for that specific time.
let currentChunks = {}
// This is the set of coordinates we see for that day.
// Note that this should contain **CHUNKS**, not just random coordinates
let currentDayLists = {}
// Cached prediction results, calculated every time we put a new chunk in
// These are just lists of coordinate tuples for ease of use with observable.js
let currentPredictions = {} 
for(let i in RESTURAUNTCODES){
	let val = RESTURAUNTCODES[i]
	currentChunks[val] = {
		total : 0,
		elements : [],
		time : 0,
	};
	currentDayLists[val] = [];
	currentPredictions[val] = [];
}
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
const USERNAMEFIELD = 'email';
const PASSWORDFIELD = 'password';
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
	    try{
		return next(null,token.user);
	    } catch (error) {
		console.log(error.stack);
		next(error);
	    }
	}
    )
);
 
app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).json("Error");
});

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
		try {
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
		}})(req,res,next);
    }
);
app.get(
	"/prediction",
	(req,res) => {
		const resturaunt = req.query.restaurant; 
		// sanity check time, we want to ensure these are valid inputs
		if(RESTURAUNTCODES.findIndex((val) => val === resturaunt) === -1){
			res.json({
				result: "Failure",
				reason: "Invalid resturant code",
				points: null,
			});
			return;
		}
		res.json({
			result: "Success",
			reason: "No Issues",
			points: currentPredictions[resturaunt],
		});
	}
);
app.get(
	"/waitTime",
	(req,res) => {
		const resturaunt = req.body.resturaunt; 
		// sanity check time, we want to ensure these are valid inputs
		if(RESTURAUNTCODES.findIndex((val) => val === resturaunt) === -1){
			res.json({
				result: "Failure",
				reason: "Invalid resturant code",
				time: currChunk.total/currChunk.elements.length,
			});
			return;
		}
		/*
		  We want to ensure quality time data to the user, so we can't just return the current chunk
		  as it has zero size guarantees. 
		  Instead, we will only return the current chunks average if it is the first chunk of the day or
		  if our current chunk is of reasonable size(defined currently as 5)
		  This should be achieved pretty quickly if we have widespread adoption
		*/
		currChunk = currentChunks[resturaunt];
		currList = currentDayLists[resturaunt];
		if(currList.length === 0 || currChunk.elements.length >=5){
			if( currChunk.elements.length === 0){
				res.json({
					result: "Failure",
					reason: "No times submitted",
					time: NaN,
				});
				return;
			}
			res.json({
				result: "Success",
				reason: "No issues",
				time: currChunk.total/currChunk.elements.length,
			});
			return;
		} else {
			currChunk=currList[currList.length - 1];
			res.json({
				result: "Success",
				reason: "Pulled from previous chunk",
				time: currChunk.total/currChunk.elements.length,
			});
			return;
		}
	}	
);
//////////////////
// secure roots //
//////////////////


let authMiddleware=passport.authenticate('jwt',{session : false});

//list all endpoints here
app.use('/user',authMiddleware, secureRoots); //for user/profile
app.use('/restaurant',authMiddleware,restaurantRoutes); //for restaurant routes/profile

secureRoots.post(
    '/recordTime',
    async (req,res,next) => {
		// get our field inputs
		const restauraunt = req.body.restaurant; // which resturant the user was waiting for
		const timeDuration = +req.body.timeDuration; // how long they waited in seconds(can be changed to millis later)
		// sanity check time, we want to ensure these are valid inputs
		if(RESTURAUNTCODES.findIndex((val) => val === restauraunt) === -1){
			res.json("Invalid Resturaunt Code!");
			return;
		}
		if(timeDuration === NaN || timeDuration <= 0){
			res.json("Invalid Time");
			return;
		}
		// now that we've made sure our inputs are good, lets try to 
		let currChunk = currentChunks[restauraunt];
		let avg = currChunk.total/currChunk.elements.length;
		// We will allow a new input if it is not a statistical outlier by the standard 1.5*IQR definition
		// OR if it's within 20% of the average(as a safe guard in case duplicate answers somehow get through)
		if(currChunk.elements.length === 0
		   || Math.abs(avg - timeDuration)<= 1.5*statistics.calculateIQR(currChunk.elements)
		   || Math.abs(avg-timeDuration) <= 0.2*avg){
			currChunk.total += timeDuration;
			currChunk.elements.push(timeDuration);
			res.json("Time Accepted");
			return;
		}
		res.json("Time Not Accepted");
	}
);

///////////////////////////////////////////////////////////////////////////////////////////
// Peridodic Code																		 //
// Put any code that needs to run on a timer(say once a day, every 5 minutes, etc) here. //
// Name the function and then write the cron below it									 //
///////////////////////////////////////////////////////////////////////////////////////////

async function storeCurrChunks(){
	for(let i in RESTURAUNTCODES){
		let val = RESTURAUNTCODES[i]
		let now = new Date()
		let dayOfWeek = now.getDay();
		currentChunks[val].time=now - new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0,0);
		currentDayLists[val].push(currentChunks[val]);
		currentChunks[val] = {
			total : 0,
			elements : [],
			time : 0,
		};
		// We can probably make this more performant, maybe cache these values?
		let histVals = await models.Prediction.findOne({ dayOfWeek : dayOfWeek,resturantCode:val });
		if(histVals == null){
			histVals = await models.Prediction.create(
				{dayOfWeek : dayOfWeek,
				 resturantCode:val,
				 modelsUsed:0,values : []});
		}
		currentPredictions[val] = histVals.generatePrediction(currentDayLists[val]);
	}
}
cron.schedule('*/5 * * * *', storeCurrChunks);
async function pushDayBack(){
	for(let i in RESTURAUNTCODES){
		let val = RESTURAUNTCODES[i]
		let now = new Date()
		let dayOfWeek = now.getDay();
		let histVals = await models.Prediction.findOne({ dayOfWeek : dayOfWeek,resturantCode:val });
		if(histVals == null){
			histVals = await models.Prediction.create(
				{dayOfWeek : dayOfWeek,
				 resturantCode:val,
				 modelsUsed:0,values : []});
		}
		histVals.integrateValues(currentDayLists[val]);
		currentDayLists[val] = [];
		currentPredictions[val] = [];
	}
}
cron.schedule('1 0 * * *',pushDayBack);
app.use('/user',passport.authenticate('jwt',{session : false}), secureRoots);
    
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

connectToDB();