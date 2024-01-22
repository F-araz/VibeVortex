const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

// Set up MongoDB connection (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect('mongodb://your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true });

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Set up session and passport middleware
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Define User model (replace with your actual User model)
const User = require('./models/User');

// Set up Passport local strategy and serialization
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set up middleware for handling JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up static file serving from the public directory
app.use(express.static(__dirname + '/public'));

// Include authentication routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Include main application routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Include song routes
const songRoutes = require('./routes/songs');
app.use('/songs', songRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
