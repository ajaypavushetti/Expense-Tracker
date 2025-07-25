const mongoose = require("mongoose");

// Load environment variables if not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// MongoDB connection URL from environment variables
const mongoUrl = process.env.MONGO_URL;

// Check if MONGO_URL is defined
if (!mongoUrl) {
  console.error("Error: MONGO_URL environment variable is not defined.");
  process.exit(1); // Exit the process if the URL is missing
}

// Connect to MongoDB
mongoose.connect(mongoUrl, {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new server discovery and monitoring engine
}).then(() => {
  console.log("MongoDB Connected Successfully!");
}).catch((error) => {
  console.error("MongoDB Connection Failed:", error);
  process.exit(1); // Exit the process on connection failure
});

// Export mongoose connection (optional, but good practice for consistency)
module.exports = mongoose.connection;
