require('./pkg/db');
const cfg = require('./pkg/config');
const auth = require('./handlers/auth');
const movies = require('./handlers/movies');
const songs = require ('./handlers/songs');

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
        { url: '/api/v1/auth/login', methods: ['POST'] },
        { url: 'api/v1/auth/forgot-password', methods: ['POST'] },
        { url: '/api/v1/auth/reset-password', methods: ['POST'] },
    ]
}));
api.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('BAD JWT');
    }
});

//create user account
api.post('/api/v1/auth', auth.create);

//user login
api.post('/api/v1/auth/login', auth.login);

//refresh token
api.get('/api/v1/auth/refresh-token', auth.refreshToken);

//* forgoten password
api.post('api/v1/auth/forgot-password', auth.forgotPassword);

//* reset password
api.post('api/v1/auth/reset-password', auth.resetPassword);

// change password
api.post('/api/v1/auth/change-password', auth.changePassword);

//list all users
api.get('/api/v1/auth/accounts', auth.listAccounts);


//movies
api.post('/api/v1/movies', movies.save);

//movies get all
api.get('/api/v1/movies', movies.getAll);


api.post('/api/v1/songs', songs.save);

api.get('/api/v1/songs', songs.getAll);

api.get('/api/v1/songs/my', songs.getUsersAll);

api.get('/api/v1/songs/:id', songs.getOne);

api.patch('/api/v1/songs/:id', songs.update);

api.delete('/api/v1/songs/:id', songs.remove);

api.post('/api/v1/games', songs.save);

api.get('/api/v1/games', songs.getAll);

api.get('/api/v1/games/my', songs.getUsersAll);

api.get('/api/v1/games/:id', songs.getOne);

api.patch('/api/v1/games/:id', songs.update);

api.delete('/api/v1/games/:id', songs.remove);





api.listen(cfg.get('server').port, err => {
    if (err) {
        console.error('Could not start server!', err);
    }
    console.log('Server successfully started on port', cfg.get('server').port);
});