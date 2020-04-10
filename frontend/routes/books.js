const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');

/* GET books */
router.get('/', function (req, res, next) {
    fetch('localhost:8081/books').then((res) => res.json());
    res.send('error');
});

module.exports = router;
