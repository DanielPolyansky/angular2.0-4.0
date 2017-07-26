const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
module.exports = mongoose.model('Conversation', new Schema({
    messageID: String,
    usersAarray: [String]
}));