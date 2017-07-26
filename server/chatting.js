let socket = require('socket.io');
const express = require('express');
const send = express.Router();
send.post('/authenticate', (req, res, next) => {
    socket.on('new_msg', (data) => {
        console.log(data);
        io.sockets.emit('new_income_msg', {
            message: data.message
        })
    });
});

module.exports = send;