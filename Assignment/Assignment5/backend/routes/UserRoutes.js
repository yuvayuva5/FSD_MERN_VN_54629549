const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, Age, email, password } = req.body;



    // Validate input
    if (!name || !Age || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({ 
      name, 
      Age,
      email, 
      password: hashedPassword 
    });
    
    const savedUser = await user.save();

    // Don't send password back to client
    const userResponse = {
      _id: savedUser._id,
      name: savedUser.name,
      Age: savedUser.Age,
      email: savedUser.email
    };

    res.status(201).json(userResponse);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }

});
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field    
    res.json(users);
  }
  catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { name, Age, email, password } = req.body;  
    const userId = req.params.id;
    const updateData = { name, Age, email };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password"); // Exclude password field
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) { 
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId).select("-password"); // Exclude password field
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    } 
    res.json(deletedUser);
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }   
});



module.exports = router;