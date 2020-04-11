const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const createError = require('http-errors');

/* GET/register */
router.get('/', function (req, res, next) {
    if (req.session.loggedin) {
        res.redirect('/');
        return;
    }
    res.status(200).render(path.join('pages', 'register'));
});

/* POST/register */
router.post('/', function (req, res, next) {
    if (req.session.loggedin) {
        res.redirect('/');
        return;
    }

    res.status(200).send();
});

module.exports = router;
