const cfg = require('./pkg/config');
const auth = require('./handlers/auth');
const post = require('./handlers/post');
require ('./pkg/db');

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');


const api = express();

api.use(bodyParser.json());
api.use(jwt({
    secret: cfg.get('server').jwt_key,
    algorithms: ['HS256']
}).unless({
    path: [
        { url: '/api/v1/auth', methods: ['POST'] },
        { url: '/api/v1/auth/login', methods: ['POST'] }
    ]
}));

api.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('BAD JWT');
    }
});

api.post('/api/v1/auth', auth.create);

//user login
api.post('/api/v1/auth/login', auth.login);

api.post('/api/v1/blog/post', post.create);
api.get('/api/v1/blog/list', post.list);
api.get('/api/v1/blog/search', post.search);
api.get('/api/v1/blog/:id', post.details);
api.put('/api/v1/blog/:id', post.update);
api.delete('/api/v1/blog/:id', post.remove);


api.listen(cfg.get('server').port, err => {
    if (err) {
        console.error('Could not start server!', err);
    }
    console.log('Server successfully started on port', cfg.get('server').port);
});