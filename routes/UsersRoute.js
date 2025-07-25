const express = require("express");
const User = require("../models/User.js");
const router = express.Router();

router.post("/login", async function (req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const newuser = new User(req.body);
    await newuser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    console.log("Register error:", error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
