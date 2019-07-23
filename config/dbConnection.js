const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true });
    console.log(
      "Welcome Romany :: Your Mongoo  DB is connected using mongoos .... "
    );
  } catch (e) {
    console.log("Error : " + e);
    process.exit(1);
  }
};
module.exports = connectDB;
