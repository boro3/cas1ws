const express = require('express');
const bodyParser = require('body-parser');
const users = require('./handlers/users');
const books = require('./handlers/books');
const cars = require('./handlers/cars');

const api = express();

api.use(bodyParser.json());

api.get('/users', users.getAll);
api.get('/users/:id', users.getOne);
api.post('/users', users.save);
api.put('/users/:id', users.update);
api.patch('/users/:id', users.updatePartial);
api.delete('/users/:id', users.remove);

api.get('/books', books.getAll);
api.get('/books/:id', books.getOne);
api.post('/books', books.save);
api.put('/books/:id', books.update);
api.patch('/books/:id', books.updatePartial);
api.delete('/books/:id', books.remove);

api.get('/cars', cars.getAll);
api.get('/cars/manufacturer/:name', cars.getByManufacturer);
api.get('/cars/:id', cars.getOne);
api.post('/cars', cars.save);
api.put('/cars/:id', cars.update);
api.patch('/cars/:id', cars.updatePartial);
api.delete('/cars/:id', cars.remove);

api.listen(8080, err => {
    if(err) {
        return console.error(err);
    }
    console.log('Server successfully started on port 8080');
});