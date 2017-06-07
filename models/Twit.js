var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TwitSchema   = new Schema({
    text: String,
    img: String,
    title: String,
    timestamp: Date
});

module.exports = mongoose.model('Twit', TwitSchema);
