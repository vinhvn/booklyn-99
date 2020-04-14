const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const createError = require('http-errors');

/* POST/publisher */
router.post('/', function (req, res, next) {
    if (!req.session.auth) {
        res.redirect('/');
        return;
    }
    let {
        publisher_name,
        banking_account,
        email,
        phone_number,
        street_number,
        street_name,
        city,
        province,
        postal_code,
    } = req.body;
    axios
        .post('http://localhost:8081/publisher', {
            publisher_name,
            banking_account,
            email,
            phone_number,
            street_number,
            street_name,
            city,
            province,
            postal_code,
        })
        .then(
            (resp) => {
                res.redirect('/manage');
                return;
            },
            (error) => {
                next(createError(500, 'Internal Server Error'));
            }
        );
});

module.exports = router;
