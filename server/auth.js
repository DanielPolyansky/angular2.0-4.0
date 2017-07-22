const express = require('express');
const auth = express.Router();
const path = require('path');
const User = require('./models/userModel');
const secret = require('../config').secret;
const jwt = require('jsonwebtoken');
const { SHA256 } = require('crypto-js');


let socket = require('socket.io');

auth.post('/login', (req, res, next) => {

    req.checkBody('email', 'email is empty!').notEmpty();
    req.checkBody('email', 'Not an email!').isEmail();
    req.checkBody('password', 'Invalid password length!').isLength({ min: 8, max: 15 });
    req.checkBody('password', 'Password is empty!').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        const messages = [];
        errors.forEach((err) => {
            messages.push(err.msg);
        });
        console.log(messages);
        res.json({
            success: false,
            message: messages
        })
    } else {
        User.findOne({
            email: req.body.email,
        }, (err, user) => {
            if (err) {
                console.log(err.msg);
                res.json(err.msg);
            } else if (!user) {
                res.json({ success: false, message: 'user not found' });
            } else if (user) {
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'password missmatch' });
                } else {
                    const token = jwt.sign(user, secret, { expiresIn: '10h' });
                    console.log('Token was created');
                    res.json({
                        success: true,
                        message: 'Token was given',
                        token
                    });
                }
            }
        });
    };
});


auth.post('/authenticate', (req, res, next) => {
    /* console.log(req.body.email);
     console.log(req.body.username);
     console.log(req.body.password);*/
    console.log(req.body);

    req.checkBody('email', 'Invalid email!Email is empty').notEmpty();
    req.checkBody('email', 'Email value is invalid!').isEmail();
    req.checkBody('username', 'Invalid login. Login is empty!').notEmpty();
    req.checkBody('password', 'Invalid password length!').isLength({ min: 8, max: 15 });
    req.checkBody('password', 'Invalid password! Empty!').notEmpty();
    req.checkBody('pass2', 'Passwords do not match!').equals(req.body.password);
    // 

    const errors = req.validationErrors();
    if (errors) {
        const messages = [];
        errors.forEach((err) => {
            messages.push(err.msg);
        });
        console.log(messages);
        res.json({
            success: false,
            message: messages
        })
    } else {
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            friends: []
        });

        newUser.save().then((user) => {
                res.json({
                    success: true,
                    message: user
                });
            },
            (err) => {
                if (err.code == 11000) {
                    res.json({
                        success: false,
                        message: err.message
                    });
                } else
                    res.json({
                        success: false,
                        message: err.message
                    });
            }
        );
    }
});

module.exports = auth;