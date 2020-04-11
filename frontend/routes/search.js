const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const createError = require('http-errors');

/* GET search */
router.get('/', function (req, res, next) {
    axios.get('http://localhost:8081/genres').then(
        (resp) => {
            res.status(200).render(path.join('pages', 'search'), resp.data);
            return;
        },
        (error) => {
            next(createError(error));
        }
    );
});

module.exports = router;
