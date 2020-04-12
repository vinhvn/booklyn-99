const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const createError = require('http-errors');

/* GET/account/:id */
router.get('/', function (req, res, next) {
    res.render(path.join('pages', 'account'), { session: req.session });
});

module.exports = router;
