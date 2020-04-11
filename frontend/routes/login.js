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
            console.log(resp);
        },
        (error) => {
            // console.log(error);
        }
    );
});

module.exports = router;
