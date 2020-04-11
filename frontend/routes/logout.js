const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const createError = require('http-errors');

router.post('/', function (req, res, next) {
    if (!req.session.loggedin) {
        next(createError(400, 'Not Logged In'));
        return;
    }
    let { key } = req.session;
    axios.post('http://localhost:8081/logout', { key }).then(
        (resp) => {
            if (resp.status === 200) {
                req.session.key = undefined;
                req.session.loggedin = false;
                res.redirect('/');
                return;
            } else {
                next(createError(400, 'Not Logged In'));
                return;
            }
        },
        (error) => {
            next(createError(500, 'Internal Server Error'));
        }
    );
});

module.exports = router;
