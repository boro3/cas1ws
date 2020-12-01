const express = require('express');
const bodyParser = require('body-parser');
const users = require('./handlers/users');

const api = express();

api.use(bodyParser.json());

api.get('/users', users.getAll);
api.get('/users/:id', users.getOne);
api.post('/users', users.save);
api.put('/users/:id', users.update);
api.post('/users/:id', users.updatePartial);
api.delete('/users/:id', users.remove);

api.listen(9000, err=>{
    if(err){
        return console.log(err);
    }
    console.log('Server successfully started at 9000!');
})