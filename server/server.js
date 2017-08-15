const express = require('express');
const app = express();
const auth = require('./auth');
const port = require('../config').port;
const secret = require('../config').secret;
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const validator = require('express-validator');
const cors = require('cors');
const mongoose = require('mongoose');
const database = require('../config').database;
const MongoClient = require('mongodb').MongoClient;
const chatting = require('./chatting');
const friends = require('./friends');
const socket = require('socket.io');
mongoose.Promise = global.Promise;
let server = app.listen(port, () => {
    console.log('server is running on ' + port);
});
const io = socket(server);
const search = require('./usersearch');
/*MongoClient.connect(database, (err, db) => {
    if (err) {
        return console.log(err);
    } else {
        console.log('DB successfuly connected!');
        db.close();
    }

});*/

mongoose.connect(database);

io.on('connection', chatting);

app.set('superSecret', secret);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(morgan('dev'));
app.use('/api', auth);
app.use('/api', search);
app.use('/api', chatting);
app.use('/api', friends);