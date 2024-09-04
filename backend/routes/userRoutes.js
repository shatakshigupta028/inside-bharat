const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userMode');
const path = require('path');

// Register
router.post('/register', (req, res) => {
  let {username, email, password} = req.body;
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt,async function(err, hash) {
          let createduser =  await User.create({
              username,
              email,
              password: hash,
      
          });
          res.redirect('/');
      });
  });
})
    
// Login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).send('Invalid email');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).send('Invalid password');
      }
  
      const payload = { subject: user._id };
      const token = jwt.sign(payload, 'secretKey');
  
      // Save the token as a cookie (optional, useful for authentication)
      res.cookie('authToken', token, { httpOnly: true });
      console.log(token);
      // Render or send the index.html file
      res.sendFile((path.join(__dirname,'../public/main.html'))); // if you have an index.html file
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  

module.exports = router;
