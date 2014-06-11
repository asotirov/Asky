function setup(app, handlers) {
    app.get('/questions', handlers.questions.getAll);
    app.get('/questions/next', handlers.questions.getNext);
    app.post('/questions', handlers.questions.create);
    app.post('/questions/:id/swipe', handlers.questions.swipe);
}

exports.setup = setup;