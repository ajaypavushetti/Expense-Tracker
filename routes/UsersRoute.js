const express = require("express");
const User = require("../models/User.js"); // User model
const router = express.Router(); // Express Router

// POST /api/users/login - User login
router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body; // Destructure email and password

    // Find user by email and password
    const user = await User.findOne({
      email: email,
      password: password,
    });

    // If user not found, return 401 Unauthorized
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If user found, return user data
    res.status(200).json(user);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// POST /api/users/register - User registration
router.post("/register", async (req, res) => {
  try {
    const newuser = new User(req.body); // Create a new User instance with request body
    await newuser.save(); // Save the new user to the database
    res.status(201).send("User Registered Successfully"); // Return success message
  } catch (error) {
    console.error("Register error:", error);
    // Handle duplicate key error (e.g., email already exists)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0]; // Get the field that caused the duplicate error
      return res.status(400).json({ message: `${field} already exists. Please use a different ${field}.` });
    }
    res.status(500).json({ message: "Internal server error during registration" });
  }
});

module.exports = router;
