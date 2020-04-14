const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const createError = require('http-errors');

router.post('/', function (req, res, next) {
    if (req.session.loggedin) {
        res.redirect('/');
        return;
    }
    let { username, password } = req.body;
    axios.post('http://localhost:8081/login', { username, password }).then(
        (resp) => {
            if (resp.status === 200) {
                let { key } = resp.data;
                req.session.loggedin = true;
                req.session.key = key;
                axios.post(`http://localhost:8081/authorization`, { key }).then(
                    (response) => {
                        req.session.auth = response.data.auth;
                        res.redirect(`/account/${key}`);
                        return;
                    },
                    (err) => {
                        next(createError(500, 'Internal Server Error'));
                    }
                );
            } else {
                next(createError(400, 'Incorrect Credentials'));
            }
        },
        (error) => {
            next(createError(500, 'Internal Server Error'));
        }
    );
});

module.exports = router;
