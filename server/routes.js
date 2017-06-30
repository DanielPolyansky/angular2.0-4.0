const express = require('express');
const routes = express.Router();
const path = require('path');

routes.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});


module.exports = routes;