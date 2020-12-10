const mongoose = require('mongoose');

let username = 'borce_ss';
let password = 'boro!759';
let dbname = 'users';

let dsn = `mongodb+srv://${username}:${password}@cluster0.vw2pn.mongodb.net/${dbname}?retryWrites=true&w=majority`;

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