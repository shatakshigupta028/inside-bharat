const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


app.use(cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));



    app.use('/api', require('./routes/userRoutes'));

    // Route for login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route for register page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
    

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
