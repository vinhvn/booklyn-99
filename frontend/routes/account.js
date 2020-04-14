const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const createError = require('http-errors');

/* GET/account/:id */
router.get('/:id', function (req, res, next) {
    if (!req.session.loggedin) {
        res.redirect('/');
        return;
    }
    axios.get(`http://localhost:8081/user?key=${req.session.key}`).then(
        (resp) => {
            res.render(path.join('pages', 'account'), {
                user: resp.data[0],
                session: req.session,
            });
            return;
        },
        (err) => {
            next(createError(404), 'Account Not Found');
        }
    );
});

module.exports = router;
