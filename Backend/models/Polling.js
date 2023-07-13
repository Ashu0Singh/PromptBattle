const mongoose = require("mongoose");

const PollingSchema = new mongoose.Schema({
    userName: String,
    votes: Number,
    image: String
}, { timestamp: true });

const Polling = mongoose.model('Polling', PollingSchema);

module.exports = User;