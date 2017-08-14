const express = require('express');
const friends = express.Router();
const path = require('path');
const User = require('./models/userModel');
const secret = require('../config').secret;
const jwt = require('jsonwebtoken');
const { SHA256 } = require('crypto-js');

friends.post('/add', (req, res, next) => { //переробити промісами нормально через зен, якщо нема юзера то пошле нах і все завалиться
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: 'smthing went wrong'
            });
        } else if (user) {
            if (req.body.username == req.body.myusername) {
                res.json({
                    "success": false,
                    "message": "user could not send request to himself"
                });
            } else
            if (user.friendsRequests.indexOf(req.body.myusername) >= 0) {
                res.json({
                    success: true,
                    message: "this user already have a request from you"
                });
            } else if (user.friends.indexOf(req.body.myusername) >= 0) {
                res.json({
                    success: true,
                    message: "this user is already your friend"
                });
            } else {
                User.findOne({ username: req.body.myusername }, (err, myuser) => {
                    if (err) {
                        res.json({
                            success: false,
                            message: "smthing go wrong, maybe user who sent the request does not exist"
                        })
                    } else {
                        if (myuser.friendsRequests.indexOf(req.body.username) >= 0) {
                            res.json({
                                success: false,
                                message: 'you already have a request from this user'
                            });
                        } else if (myuser.friends.indexOf(req.body.username) >= 0) {
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
        } else {
            res.json({
                "success": false,
                "message": "user not found"
            });
        }

    })
});

friends.delete('/delete', (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            res.json({
                "success": false,
                "message": err.msg
            });
        } else if (user) {
            User.findOne({ username: req.body.myusername }, (err, myuser) => {
                if (err) {
                    res.json({
                        "success": false,
                        "message": err.msg
                    });
                } else if (myuser) {
                    if (myuser.friends.indexOf(user.username) >= 0) {
                        let index1 = myuser.friends.indexOf(req.body.username);
                        myuser.friends.splice(index1, 1);
                        let myFriendsList = myuser.friends;

                        let index2 = user.friends.indexOf(req.body.myusername);
                        user.friends.splice(index2, 1);
                        let userFriendsList = user.friends;

                        User.update({ username: req.body.myusername }, {
                            $set: { friends: myFriendsList }
                        }, () => {
                            console.log("my friendslist updated!");
                        });
                        User.update({ username: req.body.username }, {
                            $set: { friends: userFriendsList }
                        }, () => {
                            console.log("former friend friendslist updated!");
                        });
                        res.json({
                            "success": true,
                            "message": "friend was deleted"
                        });
                    } else {
                        res.json({
                            "success": false,
                            "message": "This user is not your friend!"
                        })
                    }

                } else {
                    res.json({
                        "success": false,
                        "message": "user not found1"
                    })
                }
            });
        } else {
            res.json({
                "success": false,
                "message": "user not found2"
            });
        }
    });
});


friends.post('/accept', (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            res.json({
                "success": false,
                "message": err.msg
            });
        } else if (user) {
            User.findOne({ username: req.body.myusername }, (err, myuser) => {
                if (err) {
                    res.json({
                        "success": false,
                        "message": err.msg
                    });
                } else if (myuser) {
                    if (myuser.friendsRequests.indexOf(user.username) >= 0) {
                        if (req.body.accept == true) {
                            let index = myuser.friendsRequests.indexOf(req.body.username);
                            myuser.friendsRequests.splice(index, 1);
                            let myFriendsRequests = myuser.friendsRequests;
                            myuser.friends.push(user.username);
                            let myFriendsList = myuser.friends;
                            console.log(user);
                            user.friends.push(myuser.username);
                            let userFriendList = user.friends;
                            User.update({ username: req.body.myusername }, {
                                $set: { friendsRequests: myFriendsRequests, friends: myFriendsList }
                            }, () => {
                                console.log("my friends and friendsRequest list updated!");
                            });
                            User.update({ username: req.body.username }, {
                                $set: { friends: userFriendList }
                            }, () => {
                                console.log("new friend friendslist updated!");
                            });
                            res.json({
                                "success": true,
                                "message": "friend was added"
                            });
                        } else {
                            let index = myuser.friendsRequests.indexOf(user.username);
                            myuser.friendsRequests.splice(index, 1);
                            let myFriendsRequests = myuser.friendsRequests;
                            User.update({ username: req.body.myusername }, {
                                $set: { friendsRequests: myFriendsRequests }
                            }, () => {
                                res.json({
                                    "success": true,
                                    "message": "friend request denied!"
                                });
                            });
                        }
                    } else {
                        res.json({
                            "success": false,
                            "message": "This user does not have appropriate request!"
                        })
                    }

                } else {
                    res.json({
                        "success": false,
                        "message": "user not found1"
                    })
                }
            });
        } else {
            res.json({
                "success": false,
                "message": "user not found2"
            });
        }
    });
});
module.exports = friends;