const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // because I will nto store passwords incorrectly.
const isEmail = require("validator").isEmail;
//because validating an email is nontrivial, we defer to a library
// TODO move all imports over to this import syntax
// Build up a schema for the user based on the discussion we had on sunday
const UserSchema = mongoose.Schema({
	email: {
		type:String,
		unique:true,
		required:true,
		validate: [isEmail,'invalid email'],
    },
    password: {
		type: String,
		required:true,
	},
    name: String,
	followingRestaurants:[{
		type:[String]
	}],
});

UserSchema.pre(
	'save',
		async function(next) {
		const hash = await bcrypt.hash(this.password,10);
		//TODO error check this hash, not sure how I could flag this to the user though
		this.password = hash;
		next();
    }
);

// METHODS -- put all methods you want our schema to have here
// Don't use arrow functions for these, it makes this unhappy because of how they inherit this
// This language is terrible 
UserSchema.methods.isRightPassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}

const UserModel = mongoose.model('user',UserSchema);

const PredictionSchema = mongoose.Schema({
	dayOfWeek: {
		type: Number,
		enum: [0,1,2,3,4,5,6],
	},
	resturantCode: {
		type: String,
		enum: ["Rendezvous","Study","Feast","BCafe","DeNeve","Epic", "BPlate"],
	},
	modelsUsed: {
		type: Number,
		default: 0,
	},
	values: [
		{
			time: {
				type: Number,
				required:true,
			},
			avgWaitTime: {
				type: Number,
				required:true,
			},
		},
	],
});

PredictionSchema.methods.compareUnweighted = function(points){
	// For now, I'll assume that these points were taken at approximately the same time
	// In the future, this may not be the case, so I record the time as well in the schema
	let i = 0;
	let totalDifference = 0;
	while(i < this.values.length && i < points.length){
		if(points[i].elements.length > 0)
			totalDifference += Math.abs(this.values[i].avgWaitTime - points[i].total/points[i].elements.length);
		i++;
	}
	if(i === 0) return 0 // If one of these is empty, they are infinitely far apart and we should do absolutely no predictions
	return totalDifference/i; // Returns the average distance between each of the points
}

PredictionSchema.methods.compareWeighted = function(points){
	// Similar to compare unweighted, but does weights comparisons at the end more then comparisons at the start
	let i = 0;
	let totalDifference = 0;
	if(points.length == 0) return 0;
	while(i < this.values.length && i < points.length){
		if(points[i].elements.length > 0)
			totalDifference += (i+1)*Math.abs(this.values[i].avgWaitTime
											- points[i].total/points[i].elements.length);
		i++;
	}
	// two comes from using the sum of an arithmetic series, which is used to find how many "points" we actually compared
	// Note that i has increased by one since we last used it
	return 2*totalDifference/(i*(i+1)); // Returns the average distance between each of the points
}
 
PredictionSchema.methods.integrateValues = function(points){
	// Given a list of chunks which represents the days data, adds them in to our current chunk
	// Designed for use with a resturant's "cannonical model", the aggregate of all of the previous days'(of that week) wait times
	// We could potentially do something fancier in the future(potentially using some filter to remove days that shouldn't count). But for now I think this suffices
	// Again assumes that the chunk collection was done at the same time as the data in the model


	// if this data is radically different than our current values(ie, average wait time difference was more than 1000 seconds off from historical models, don't add it
	if(this.compareUnweighted(points) >= 1000) return;
	let i = 0;
	while(i < this.values.length && i < points.length){
		// Find a new average, ignoring empty chunks for now
		// In the future, we might have enough users that an empty chunk can indicate no one was waiting for 5m
		if(this.values.length > 0)
			this.values[i].avgWaitTime = (this.values[i].avgWaitTime*this.modelsUsed
								+ points[i].total/points[i].elements.length)/(this.modelsUsed + 1);
		i++;
	}
	while(i < points.length){
		this.values.push({time:points[i].time,avgWaitTime:points[i].total/points[i].elements.length});
		i++;
	}
	this.modelsUsed++;
}

PredictionSchema.methods.generatePrediction = function(points){
	let predictionList = [];
	// Afterwards, we want to see how closely this works with our model, we do this via the weighted prediction.
	let difference = this.compareWeighted(points);
	let iterStep = 5*60*1000; // For now, iterate across the whole five minutes at once.
	let maxIters = 24*60*60*1000/iterStep;
	// The maximum average deviance we allow the program to be comfortable with before it stops making predictions. Currently 5m
	let maxDifference = 5*60;
	// This is primitive, but can be upgraded at a later point
	// The number of steps we feel like we can confidently predict
	let numSteps = difference == 0 ? Infinity : Math.floor(maxDifference/difference);
	let startingLength = predictionList.length;
	let nextTime = startingLength*iterStep;
	// populate the list with the current values of the day
	if(points.length == 0){
		nextTime = 0;
		// if points length is 0, we just show our historical data
		for(let i = 0; i < this.values.length; i++){
			predictionList.push([
				nextTime,
				this.values[i].avgWaitTime]);
			nextTime += iterStep;
		}
		return predictionList;
		
	}
	for(let i in points){
		if(points[i].elements.length > 0)
			predictionList.push([
				points[i].time,
				points[i].total/points[i].elements.length,
			]);
	}
	for(let i = startingLength; i < maxIters && i < numSteps + startingLength; i++){
		if(i > 1){ //if there are at least two values in prediction list
			let val1 = predictionList[i-2];
			let val2 = predictionList[i-1];
			let predictedValue = linearExtrapolate(val1[0],val1[1],val2[0],val2[1],nextTime);
			let historicalValue = this.values[i % this.values.length].avgWaitTime;
			let pushVal = linearInterpolate(historicalValue,predictedValue,difference/maxDifference);
			predictionList.push([nextTime,pushVal]);
		} else {
			predictionList.push([
				nextTime,
				this.values[i % this.values.length].avgWaitTime]);
		}
		nextTime+=iterStep;
	}
	return predictionList;
}
function linearInterpolate(val1,val2, x){
	// Does a linear interpolation assuming  val1 and val2 are a distance of 1 away, with x acting as the value to choose between them normalized to one
	if(val1 == null || val1 == undefined || val1 == NaN) return val2;
	return (1-x)*val1 + x*val2;
}
function linearExtrapolate(x1,y1,x2,y2,x3){
	let slope = (y2-y1)/(x2-x1);
	return slope*(x3-x1) + y1;
}
const PredictionModel = mongoose.model('prediction',PredictionSchema);

const HistSchema = mongoose.Schema({
	restaurant: {
		type:String,
		required:true,
	},
	date: {
		type:Date,
		required:true,
	},
	values: {
		type: [[Number]],
		required:true,
	}
});

const HistModel = mongoose.model('history',HistSchema);

module.exports.User = UserModel;
module.exports.Prediction = PredictionModel;
module.exports.Hist = HistModel;
