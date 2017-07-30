const express = require('express');
const search = express.Router();
const path = require('path');
const User = require('./models/userModel');
const secret = require('../config').secret;
const jwt = require('jsonwebtoken');
const { SHA256 } = require('crypto-js');

search.get('/usersearch', (req, res, next) => {
    userList = [String];
    User.find({
        username: req.body.usersearch + '*'
    }, (err, users) => {
        if (err) {
            console.log(err.msg)
        } else {
            res.json()
        }
    });
    res.json({
        success: true,

    });
});

module.exports = search;