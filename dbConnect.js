const mongoose = require("mongoose");
require("dotenv").config();

const connect = mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;
connection.on("error", (err) => console.log(err));
connection.on("connected", () => console.log("mongoDB connected"));
