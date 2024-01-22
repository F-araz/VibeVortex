const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// Route for user registration
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username });
        const registeredUser = await User.register(user, password);
        res.json({ success: true, user: registeredUser });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// Route for user login
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ success: true, user: req.user });
});

// Route for user logout
router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true });
});

// Example route to check if a user is authenticated
router.get('/check-auth', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ success: true, user: req.user });
    } else {
        res.json({ success: false, message: 'User not authenticated' });
    }
});

module.exports = router;
