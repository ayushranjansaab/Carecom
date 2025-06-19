// backend/routes/authRoutes.js
 const express = require('express');
 const router = express.Router();
  const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 const User = require('../models/User');

 // Register new user
 router.post('/register', async (req, res) => {
   const { name, email, password, role } = req.body;

   // Check if the user already exists
   const existingUser = await User.findOne({ email });
   if (existingUser) return res.status(400).json({ msg: 'User already exists' });

   // Hash the password
   const hashedPassword = await bcrypt.hash(password, 10);

   // Create a new user
   const newUser = new User({
     name,
     email,
     password: hashedPassword,
     role: role || 'patient', // Default role is 'patient'
   });

   await newUser.save();
   res.json({ msg: 'User registered successfully' });
 });
 // Login user
 router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   // Find user by email
   const user = await User.findOne({ email });
   if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

   // Compare the password
   const match = await bcrypt.compare(password, user.password);
   if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

   //  Add full payload
   const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  
   res.json({
     token,
     user: { id: user._id, name: user.name, role: user.role },
   });
 });

 module.exports = router;

