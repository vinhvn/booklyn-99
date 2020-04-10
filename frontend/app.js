// Modules
const express = require('express');
const path = require('path');
const session = require('express-session');
// Routers
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

const app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        resave: false,
        secret: 'comp3005',
        saveUninitialized: false,
    })
);

// Routes
app.use('/', indexRouter);
app.use('/books', booksRouter);

// Catch all other requests as 404s
app.all('*', (req, res, next) => {
    res.status(404).render('pages/error', {
        status: '404',
        message: 'Resource Not Found',
        session: req.session,
    });
});

module.exports = app;