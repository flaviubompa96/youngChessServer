const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    fideid: String,
    name: String,
    country: String,
    sex: String,
    title: String,
    rating: String,
    rapid_rating: String,
    blitz_rating: String,
    birthday: String,
});

module.exports = mongoose.model("Player", playerSchema);
