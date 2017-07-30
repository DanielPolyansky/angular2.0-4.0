const express = require('express');
const search = express.Router();
const path = require('path');
const User = require('./models/userModel');
const secret = require('../config').secret;
const jwt = require('jsonwebtoken');
const { SHA256 } = require('crypto-js');

search.post('/usersearch', (req, res, next) => {
    User.find({
        username: new RegExp(req.body.username, "i")
    }, 'username', (err, users) => {
        if (err) {
            console.log(err);
        } else {
            if (users.length == 0) {
                res.json({
                    success: true,
                    message: 'No users is founded'
                });
            } else {
                res.json({
                    success: true,
                    message: 'Users founded',
                    users
                });
            }
        }
    });

});

module.exports = search;