// server/index.js

const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;

const app = express();
require('dotenv').config();
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

connectToDB();
