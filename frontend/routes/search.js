const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const createError = require('http-errors');

/* GET search */
router.get('/', function (req, res, next) {
    // axios.get('localhost:8081/genres').then(
    //     (resp) => {
    //         res.status(200).render(path.join('pages', 'search'), resp.data);
    //         return;
    //     },
    //     (error) => {
    //         console.log(error);
    //     }
    // );
    // next(createError(503, 'Service Unavailable'));

    res.status(200).render(path.join('pages', 'search'), {
        genre: ['Mystery', 'Romance'],
    });
});

module.exports = router;
