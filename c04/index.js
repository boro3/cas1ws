// REST -representational state transfer
// HTTP with plus rules

// POST, GET, +(PATCH, UPDATE, DELETE)

//GET-> кога сакаме да преземеме податоци од сервер
//POST-> кога сакаме да креираме/додадеме податоци на сервер
//PUT-> служи за ажурирање на целосен податок/запис
//PATCH-> служи за делумно ажурирање на запис/податок
//DELTE -> служи за бришење на податоци/саписи

//REST endpoints -> патеки до податоците на REST серверот

const express = require('express');
const bodyParser = require('body-parser');

let userData = [];

const api = express();

api.use(bodyParser.json());

api.post('/users', (req, res) => {
    userData = [...userData, req.body]
    res.status(201).send(req.body);
});

api.get('/users', (req, res) => {
    res.status(200).send(userData);
});

api.get('/users/:id', (req, res) => {
    if (!userData[req.params.id]) {
        return res.status(404).send("Not Found!");
    }
    res.status(200).send(userData[req.params.id]);
});

api.patch('/users/:id', (req, res) => {
    if (!userData[req.params.id]) {
        return res.status(404).send("Not Found!");
    }
    let newData = {
        ...userData[req.params.id]
    };
    userData[req.params.id] = newData;
    res.status(201).send(userData);
});

api.put('/users/:id', (req, res) => {
    if (!userData[req.params.id]) {
        return res.status(404).send("Not Found!");
    }
    userData[req.params.id] = req.body;
    res.status(204).send(req.body);
});

api.delete('/users/:id', (req, res) => {
    res.status(200).send(newData);
});

api.listen(8080, err => {
    if (err) {
        return console.error(err);
    }
    console.log('Server started on port 8080');
});