var mongoose = require('mongoose');
var DataService = function() {

}

DataService.prototype.initialize = function (done) {
    mongoose.connect('mongodb://localhost/asky');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("Database initialized!");
        done();
    });
}

DataService.prototype.get = function (done) {

}

module.exports = DataService;