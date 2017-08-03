const express = require('express');
const friends = express.Router();
const path = require('path');
const User = require('./models/userModel');
const secret = require('../config').secret;
const jwt = require('jsonwebtoken');
const { SHA256 } = require('crypto-js');


friends.post('/add', (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: 'smthing went wrong'
            });
        } else {

            if (user.friendsRequests.indexOf(req.body.myusername) >= 0) {
                res.json({
                    success: true,
                    message: "this user already have a request from you"
                });
            } else {
                User.findOne({ username: req.body.myusername }, (err, myuser) => {
                    if (err) {
                        res.json({
                            success: false,
                            message: err.msg
                        })
                    } else {
                        if (myuser.friendsRequests.indexOf(req.body.username) >= 0) {
                            res.json({
                                success: false,
                                message: 'you already have a request from this user'
                            });
                        } else if (myuser.friends.indexOf(req.body.username)) {
                            res.json({
                                success: false,
                                message: 'you already have this user in your friends list'
                            });
                        } else {
                            requests = user.friendsRequests;
                            requests.push(req.body.myusername);
                            console.log(requests);
                            User.update({ username: req.body.username }, { $set: { friendsRequests: requests } }, () => {
                                res.json({
                                    success: true,
                                    message: 'friends request was sent'
                                });
                            });
                        }
                    }
                })
            }
        }

    })
});

friends.delete('/delete', (req, res, next) => {
    User.find({ username: req.username }, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: err.msg
            });
        } else {
            let index1 = user.friends.indexOf(req.body.myusername);
            let tempFormerFriendList = user.friends.splice(index1, 1);
            User.update({ username: req.body.username }, { $set: { friends: tempFormerFriendList } }, () => {
                console.log('deleted from former friend friendlist');
            });
            User.findOne({ username: req.body.myusername }, (err, myuser) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Can`t remove you from user friends'
                    });
                } else {
                    let index2 = myuser.friends.indexOf(req.body.username);
                    let tempMyFriendList = myuser.friends.splice(index2, 1);
                    User.update({ username: req.body.username }, { $set: { friends: tempFormerFriendList } }, () => {
                        res.json({
                            success: true,
                            message: 'user successfuly deleted'
                        });
                    });
                };
            });
        };
    });
});


friends.post('/accept', (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: err.msg
            });
        } else {
            if (req.body.accept == true) {
                let tempNewFriendList = user.friends
                tempNewFriendList.push(req.body.myusername);
                User.update({ username: req.body.username }, { $set: { friends: tempNewFriendList } }, () => {
                    console.log('new friend friendlist was changed');
                });
                User.findOne({ username: req.body.myusername }, (err, myuser) => {
                    if (err) {
                        res.json({
                            success: false,
                            message: err.msg
                        });
                    } else {
                        let tempMyFriendList = myuser.friends;
                        tempMyFriendList.push(req.body.username);
                        let index = myuser.friendsRequests.indexOf(req.body.username);
                        let tempMyRequests = myuser.friendsRequests.splice(index, 1);
                        User.update({ username: req.body.myusername }, { $set: { friends: tempMyFriendList, friendsRequests: tempMyRequests } }, () => {
                            console.log('my friendlist was changed');
                        });
                        res.json({
                            success: true,
                            message: 'friend was added'
                        });
                    }
                })
            } else {
                res.json({
                    success: true,
                    message: 'request was denied'
                });
            }
        }
    });
});
module.exports = friends;