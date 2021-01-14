const usersModel = require('../pkg/users');
const usersValidator = require('../pkg/users/validators');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cfg = require('../pkg/config');
const mailer = require('./../pkg/mailer');


const create = async (req, res) => {
    try {
        await usersValidator.validate(req.body, usersValidator.registrationSchema);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Bad Request!');
    }
    //check if user already exists
    try {
        let ru = await usersModel.getOneByEmail(req.body.email);
        if (ru) {
            return res.status(409).send('Conflict!');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
    // hasing password
    // req.body.password = bcrypt.hashSync(req.body.password);
    // set default data for single user
    req.body._created = new Date();
    req.body._deleted = false;
    try {
        let u = await usersModel.save(req.body);
        mailer.send(
            ['boro.7597@gmail.com'],
            "WELCOME",
            {
                name: req.body.first_name
            }
        );
        res.status('201').send(u);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
};
const login = async (req, res) => {
    //validate user data
    try {
        await usersValidator.validate(req.body, usersValidator.loginSchema);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Bad Request!');
    }
    //get user
    try {
        let ru = await usersModel.getOneByEmail(req.body.email);
        if (!ru) {
            return res.status(403).send('Forbidden!');
        }
        // if (bcrypt.compareSync(req.body.password, ru.password)) 
        if (req.body.password == ru.password) {
            let payload = {
                uid: ru._id,
                first_name: ru.first_name,
                last_name: ru.last_name,
                email: ru.email,
                exp: (new Date().getTime() + (365 * 24 * 60 * 60 * 1000)) / 1000
            };
            let key = cfg.get('server').jwt_key;
            let token = jwt.sign(payload, key);
            return res.status(200).send({ jwt: token })
        }
        return res.status(401).send('Unauthorized!');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
};

const forgotPassword = async (req, res) => {
    try {
        await usersValidator.validate(req.body, usersValidator.forgotSchema);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Bad Request!');
    }
    try {
        let ru = await usersModel.getOneByEmail(req.body.email);
        if (!ru) {
            return res.status(403).send('Forbidden!');
        }
        let payload = {
            email: ru.email,
            exp: (new Date().getTime() + (30 * 60 * 1000)) / 1000
        };
        let key = cfg.get('server').jwt_key;
        let token = jwt.sign(payload, key);
        ru.reset_hash = token;
        await ru.save();
        mailer.send(
            ['boro.7597@gmail.com'],
            "RESET_PASSWORD",
            {
                name: ru.first_name,
                link: token
            }
        );
        return res.status(200).send('ok');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
};

const resetPassword = async (req, res) => {
    try {
        await usersValidator.validate(req.body, usersValidator.resetSchema);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Bad Request!');
    }
    if (req.body.new_password1 !== req.body.new_password2) {
        return res.status(400).send('Bad Request!');
    }
    try {
        let ru = await usersModel.getOneByEmail(req.user.email);
        if (!ru) {
            return res.status(403).send('Forbidden!');
        }
        if (ru.reset_hash && ru.email === req.user.email) {
            ru.reset_hash = undefined;
            ru.password = req.body.new_password1;
            await ru.save();
            return res.status(200).send('ok');
        }
        return res.status(400).send('Bad Request!');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
};

module.exports = {
    create,
    login,
    forgotPassword,
    resetPassword
}