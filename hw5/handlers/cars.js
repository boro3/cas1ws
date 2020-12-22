const carsModel = require('../pkg/cars/cars_mongo');
const carsValidator = require('../pkg/cars/validator');

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
        await carsValidator.validate(req.body, carsValidator.carSchema);
    } catch (e) {
        console.log(e);
        return res.status(400).send('Bad Content');
    }
    try {
        let u = await carsModel.save(req.body);
        return res.status(201).send(u);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const update = async (req, res) => {
    try {
        await carsValidator.validate(req.body, carsValidator.carSchema);
    } catch (e) {
        console.log(e);
        return res.status(400).send('Bad Content');
    }
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
        await carsValidator.validate(req.body, carsValidator.carUpdatePartialSchema);
    } catch (e) {
        console.log(e);
        return res.status(400).send('Bad Content');
    }
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

module.exports = {
    getAll,
    getOne,
    save,
    update,
    updatePartial,
    remove
};