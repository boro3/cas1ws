const mongoose = require('mongoose');

let username = 'borce_ss';
let password = 'boro!759';
let dbname = 'users';
let host = "cluster0.vw2pn.mongodb.net"

let dsn = `mongodb+srv://${username}:${password}@${host}/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(
    dsn,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    err => {
        if (err) {
            return console.log('Could not connect to database: ', err);
        }
        console.log('Successfully conneted to database');
    }
);