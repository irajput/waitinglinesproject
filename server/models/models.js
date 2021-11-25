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
	modelsUsed: {
		type: Number,
		default: 0,
	}
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

PredictionSchema.methods.compareUnweighted(points){
	// for now, I'll assume that these points were taken at approximately the same time
	// in the future, this may not be the case, so I record the time as well in the schema
	let i = 0;
	let totalDifference = 0;
	while(i < this.values.length && i < points.length){
		totalDifference += Math.abs(this.values[i].avgWaitTime - points[1]);
	}
	if(i === 0) return Infinity // If one of these is empty, they are infinitely far apart and we should do absolutely no predictions
	return totalDifference/i; //returns the average
}

const PredictionModel = mongoose.model('prediction',PredictionSchema);

module.exports.User = UserModel;
module.exports.Prediction = PredictionModel;
