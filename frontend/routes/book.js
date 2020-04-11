const express = require('express');
const router = express.Router();
const path = require('path');
const createError = require('http-errors');
const axios = require('axios');

/* GET book */
router.get('/:isbn', function (req, res, next) {
    // console.log(req.params.isbn);
    if (!req.params.isbn) return next(createError(401, 'Invalid ISBN'));
    if (req.params.isbn.length > 13)
        return next(createError(401, 'Invalid ISBN'));
    let query = `http://localhost:8081/books?isbn=${req.params.isbn}`;

    axios(query).then(
        (resp) => {
            if (Object.keys(resp.data).length === 0)
                return next(createError(404, 'Book not found'));
            res.render(path.join('pages', 'book'), resp.data[0]);
        },
        (error) => {
            // console.log(error);
        }
    );
});

module.exports = router;
