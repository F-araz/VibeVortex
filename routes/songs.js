const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Route to get all songs for a specific user
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find({ user: req.user._id });
        res.json({ success: true, songs });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// Route to upload a new song
router.post('/upload', async (req, res) => {
    try {
        const { title, artist, file } = req.body;
        const newSong = new Song({
            title,
            artist,
            file,
            user: req.user._id,
        });
        const savedSong = await newSong.save();
        res.json({ success: true, song: savedSong });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// Route to delete a song
router.delete('/:id', async (req, res) => {
    try {
        const deletedSong = await Song.findByIdAndDelete(req.params.id);
        res.json({ success: true, deletedSong });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// Additional routes for managing playlists, shuffling, repeating, etc., can be added here

module.exports = router;
