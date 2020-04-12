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
    res.status(200).render(path.join('pages', 'register'), {
        session: req.session,
    });
});

/* POST/register */
router.post('/', function (req, res, next) {
    if (req.session.loggedin) {
        res.redirect('/');
        return;
    }
    let {
        username,
        password,
        first_name,
        last_name,
        email,
        phone_number,
        gender,
        age,
        street_number,
        street_name,
        city,
        province,
        postal_code,
    } = req.body;
    axios
        .post('http://localhost:8081/register', {
            username,
            password,
            first_name,
            last_name,
            email,
            phone_number,
            gender,
            age,
            street_number,
            street_name,
            city,
            province,
            postal_code,
        })
        .then(
            (resp) => {
                if (resp.status === 200) {
                    res.redirect('/');
                    return;
                } else {
                    next(createError(400, 'Duplicate Username'));
                }
            },
            (error) => {
                next(createError(500, 'Internal Server Error'));
            }
        );
});

module.exports = router;
