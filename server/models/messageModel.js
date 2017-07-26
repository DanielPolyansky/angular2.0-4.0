const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
module.exports = mongoose.model('Message', new Schema({
    messageValue: String,
    messageTime: Date(),
    messagePicture: String,
    conversationId: String
}));