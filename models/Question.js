var mongoose = require('mongoose');

var Question = mongoose.model('Question', {
    text: String,
    top: String,
    bottom: String,
    topCount: Number,
    bottomCount: Number,
    swipesCount: Number,
    date: Date
})
module.exports = Question;