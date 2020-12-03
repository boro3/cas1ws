const carsModel = require('../pkg/cars');

const getAll = async (req, res) => {
    try {
        let data = await carsModel.getAll();
        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const getOne = async (req, res) => {
    try {
        let data = await carsModel.getOne(req.params.id);
        if (data) {
            return res.status(200).send(data);
        }
        return res.status(404).send('Not Found');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const save = async (req, res) => {
    try {
        let b = await carsModel.save(req.body);
        return res.status(201).send(b);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const update = async (req, res) => {
    try {
        let c = await carsModel.update(req.params.id, req.body);
        if (c) {
            return res.status(204).send('No Content');
        }
        return res.status(404).send('Not Found');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const updatePartial = async (req, res) => {
    try {
        let c = await carsModel.updatePartial(req.params.id, req.body);
        if (c) {
            return res.status(204).send('No Content');
        }
        return res.status(404).send('Not Found');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const remove = async (req, res) => {
    try {
        let c = await carsModel.remove(req.params.id);
        if (c) {
            return res.status(204).send('No Content');
        }
        return res.status(404).send('Not Found');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const getByManufacturer = async (req, res) => {
    try {
        let data = await carsModel.getByManufacturer(req.params.name);
        console.log(req.params.name)
        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAll,
    getOne,
    save,
    update,
    updatePartial,
    remove,
    getByManufacturer
};