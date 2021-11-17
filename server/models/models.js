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

module.exports.User = UserModel;
