var express = require('express');
var AccountHandler = require('./handlers/AccountHandler');
var QuestionsHandler = require('./handlers/QuestionsHandler');
var bodyParser = require('body-parser');
var routes = require('./Routes');
var services = require('./services');

var handlers = {
    account: new AccountHandler(),
    questions: new QuestionsHandler()
};

(function start() {
    var app = express();
    app.use(require('express-domain-middleware'));
    app.use(bodyParser());
    app.use(logErrors);

    function logErrors(err, req, res, next) {
        console.error(err.stack);
        next(err);
    }


    routes.setup(app, handlers);

    app.use(function errorHandler(err, req, res, next) {
        console.log('error on request %d %s %s: %j', process.domain.id, req.method, req.url, err);
        res.send(500, "Something bad happened. :(");
        if(err.domain) {
            //you should think about gracefully stopping & respawning your server
            //since an unhandled error might put your application into an unknown state
        }
    });


    app.use(notFound);
    function notFound(req, res, next) {
        res.send(404, "Not found");
    }

    var port = process.env.PORT || 3000;
    services.getDataService().initialize(function() {
        app.listen(port);
        console.log("Express server listening on port %d in %s mode", port, app.settings.env);
    });
}());
