const gamesModel = require('../pkg/games');

const save = async (req, res) => {
    try {
        let data = {
            ...req.body,
            _deleted: false,
            _public: true,
            uid: req.user.uid
        }
        await gamesModel.save(data);
        res.status('201').send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }
};

const getAll = async (req, res) => {
    try {
        let data = await gamesModel.getAll();
        return res.status(200).send(data)
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
};

const getUsersAll = async (req, res) => {
    try {
        let data = await gamesModel.getUsersAll(req.user.uid);
        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
};


const getOne = async (req, res) => {
    try {
        let data = await gamesModel.getOne(req.params.id, req.user.uid);
        if (!data) {
            return res.status(400).send('Bad Request!');
        }
        return res.status(200).send(data)
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
};

const update = async (req, res) => {
    try {
        await gamesModel.update(req.params.id, req.body, req.user.uid);
        return res.status(201).send('ok');
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
};

const remove = async (req, res) => {
    try {
        let a = await gamesModel.remove(req.params.id, req.user.uid);
        if (!a) {
            return res.status(400).send('Bad Request!');
        }
        return res.status(201).send('ok');
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
};


module.exports = {
    save,
    getAll,
    getUsersAll,
    getOne,
    update,
    remove
};


