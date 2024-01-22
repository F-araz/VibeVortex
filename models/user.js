const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: String,
    // Add any additional fields you may need for the user
    // For example, you might want to store user preferences, playlists, etc.
});

// Use passport-local-mongoose plugin to simplify working with usernames and passwords
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
