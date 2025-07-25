const express = require("express");
const dbConnect = require("./dbConnect.js"); // Database connection
const app = express();
const cors = require("cors");
const path = require("path"); // For serving static files in production

// Set NODE_ENV to 'development' if not already set. This helps ensure consistent behavior.
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

// Middleware to parse JSON request bodies
app.use(express.json());

// Allowed origins for CORS. Add more origins if needed.
const allowedOrigins = [
  "https://expense-tracker-1-u5jj.onrender.com", 
  // Add other allowed origins (e.g., your local frontend URL during development)
  // "http://localhost:5173" // Example for local Vite development server
];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      // Check if the origin is in the allowed list
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Import and mount user and transaction routes
const userRoute = require("./routes/UsersRoute.js");
const transactionsRoute = require("./routes/transactionsRoute.js");

// Mount API routes. Removed trailing slashes for cleaner path handling.
app.use("/api/users", userRoute);
app.use("/api/transactions", transactionsRoute);

// Serve static assets in production
// This block ensures that when the app is deployed (NODE_ENV is 'production'),
// Express serves the built React application.
if (process.env.NODE_ENV === 'production') {
    // Set the static folder to the 'dist' directory inside the 'client' folder.
    // This 'dist' folder is created when you run 'npm run build' in your React app.
    app.use(express.static(path.join(__dirname, 'client', 'dist')));

    // For any other GET request not handled by API routes,
    // serve the 'index.html' file from the 'client/dist' folder.
    // This allows client-side routing (React Router) to take over.
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')); 
    });
}

// Start the server
const PORT = process.env.PORT || 3000; // Use environment port or default to 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
