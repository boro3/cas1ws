const mongoose = require('mongoose');

const Car = mongoose.model(
    'cars',
    {
        manufacturer: String,
        model: String,
        type: String
    },
    'cars'
);

const getAll = async () => {
    try {
        let data = await Car.find({});
        return data;
    } catch(err) {
        console.log(err);
    }
};

const getOne = async (id) => {
    try {
        let data = await Car.findOne({_id: id});
        return data;
    } catch (err) {
        console.log(err);
    }
};

const save = async (carData) => {
    try {
        let c = new Car(carData);
        let data = await c.save();
        return data;
    } catch(err) {
        console.log(err);
    }
};

const update = async (id, carData) => {
    try {
        let data = await Car.updateOne({_id: id}, carData);
        return data.nModified !== 0;
    } catch(err) {
        console.log(err);
    }
};

const updatePartial = async (id, carData) => {
    try {
        let data = await Car.updateOne({ _id: id }, carData);
        return data.nModified !== 0;
    } catch (err) {
        console.log(err);
    }
};

const remove = async (id) => {
    try {
        let data = await Car.deleteOne({ _id: id });
        return data.deletedCount !== 0;
    } catch (err) {
        console.log(err);
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