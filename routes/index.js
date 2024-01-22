const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Route to render the main page
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find({ user: req.user._id });
        res.render('index', { songs });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// Additional routes for main application functionality can be added here

module.exports = router;
