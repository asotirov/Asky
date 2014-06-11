var Question = require('../models/Question.js');
var QuestionsHandler = function() {

}

QuestionsHandler.prototype.getAll = function(req, res, next) {
    Question.find(function(err, data){
        if(err){
            return next(err);
        }
        res.send(data);
    });
}

QuestionsHandler.prototype.getNext = function(req,res,next){
    Question.findOne(function(err, data) {
        if(err){
            return next(err);
        }
        if(!data) {
            return next(new Error("No next question!"))
        }

        res.send(data);
    });
}

QuestionsHandler.prototype.create = function(req, res, next) {
    var question = req.body;
    question.swipesCount = 0;
    question.date = new Date();

    Question.create(req.body, function(err, data){
        if(err){
            return next(err);
        }
        res.send(201, data);
    });
}

QuestionsHandler.prototype.swipe = function(req, res, next) {
    Question.findOneAndUpdate({ _id: req.params.id }, { $inc : { swipesCount: 1}}, function(err, data){
        if(err){
            return next(err);
        }
        res.send(data);
    })
}

module.exports = QuestionsHandler;