const express = require("express");
const dbConnect = require("./dbConnect.js");
const app = express();
const cors = require("cors");
const path = require("path"); // Import the path module

// Set NODE_ENV for local development if not already set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

app.use(express.json());

const allowedOrigins = [
  "https://expense-tracker-1-u5jj.onrender.com", 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
    credentials: true, 
  })
);

const userRoute = require("./routes/UsersRoute.js");
const transactionsRoute = require("./routes/transactionsRoute.js");

// These paths are checked for malformed parameters by path-to-regexp
app.use("/api/users", userRoute); 
app.use("/api/transactions", transactionsRoute);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // This path is also checked
    app.use(express.static('client/dist')); 

    // This path is also checked
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')); 
    });
}

app.listen(3000, () => {
  console.log("server running on port 3000"); 
});
