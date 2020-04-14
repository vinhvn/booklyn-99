const express = require('express');
const router = express.Router();
const path = require('path');
const createError = require('http-errors');
const axios = require('axios');

router.post('/', function (req, res, next) {
    if (!req.session.loggedin || !req.session.auth) {
        res.redirect('/');
        return;
    }
    let { isbn } = req.body;
    axios.delete(`http://localhost:8081/book`, { data: { isbn } }).then(
        (resp) => {
            res.redirect('/books');
            return;
        },
        (err) => {
            next(createError(500, 'Internal Server Error'));
        }
    );
});

module.exports = router;
