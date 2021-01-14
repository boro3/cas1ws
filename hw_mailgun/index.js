const cfg = require('./pkg/config');
const auth = require('./handlers/auth');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');

require('./pkg/db');


const api = express();
api.use(bodyParser.json());

api.use(jwt({
    secret: cfg.get('server').jwt_key,
    algorithms: ['HS256']
}).unless({
    path: [
        { url: '/api/v1/auth', methods: ['POST'] },
        { url: '/api/v1/auth/login', methods: ['POST'] },        
        { url: '/api/v1/auth/forgot-password', methods: ['POST'] }
    ]
}));

api.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('BAD JWT');
    }
});

// create acount
api.post('/api/v1/auth/create', auth.create);

//log in
api.post('/api/v1/auth/login', auth.login)

//* forgoten password
api.post('/api/v1/auth/forgot-password', auth.forgotPassword);

//* reset password
api.post('/api/v1/auth/reset-password', auth.resetPassword);

api.listen(cfg.get('server').port, err => {
    if (err) {
        console.log('Could not start server!', err);
    }
    console.log('Server successfully started on port ', cfg.get('server').port);
});