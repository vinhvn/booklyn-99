const express = require('express');
const router = express.Router();
const path = require('path');

const axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
    let query = 'http://localhost:8081/books?';
    if (req.query.title !== '' && req.query.title)
        query += `title=${req.query.title}&`;
    if (req.query.author !== '' && req.query.author)
        query += `author=${req.query.author}&`;
    if (req.query.genre !== '' && req.query.genre)
        query += `genre=${req.query.genre}&`;
    if (req.query.isbn !== '' && req.query.isbn)
        query += `isbn=${req.query.isbn}&`;
    if (req.query.publisher !== '' && req.query.publisher)
        query += `publisher=${req.query.publisher}&`;

    axios(query).then(
        (resp) => {
            res.render(path.join('pages', 'books'), {
                books: resp.data,
                session: req.session,
            });
        },
        (error) => {
            console.log(error);
        }
    );
});

module.exports = router;
