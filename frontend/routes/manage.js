const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const createError = require('http-errors');

router.get('/', function (req, res, next) {
    if (!req.session.loggedin) {
        res.redirect('/');
        return;
    }
    res.render(path.join('pages', 'manage'), { session: req.session });
});

module.exports = router;
