const mongoose = require("mongoose");

const restuarantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  studentIDs:{
    type:[String],
    required: true,
  },
  crowdednessRating:{
    type:String,
  },
  openTime:{
    type:String,
  },
  closeTime:{
    type:String,
  },
  historicalData:{
    type:[[String]], //might have to change this
  },
  
});
restuarantSchema.index({ name: "text" });

const Restaurant = mongoose.model("restaurant", restuarantSchema);

module.exports = Restaurant;