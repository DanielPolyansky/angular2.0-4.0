const socket = require('socket.io');
const express = require('express');
const send = express.Router();

const chatting = (socket) => {
    console.log('socket connected');
    socket.on('disconnect', () => {
        console.log('socket disconnected');
    });
    socket.on('new_msg', (data) => {
        io.sockets.emit('new_income_msg', {
            message: data.message
        })
    });
};


module.exports = chatting;