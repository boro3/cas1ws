const mongoose = require('mongoose');

const User = mongoose.model(
    'users',
    {
        first_name: String,
        last_name: String
    },
    'users'
);

const getAll = async () => {
    try {
        let data = await User.find({});
        return data;
    } catch(err) {
        console.log(err);
    }
};

const getOne = async (id) => {
    try {
        let data = await User.findOne({_id: id});
        return data;
    } catch (err) {
        console.log(err);
    }
};

const save = async (userData) => {
    try {
        let u = new User(userData);
        let data = await u.save();
        return data;
    } catch(err) {
        console.log(err);
    }
};

const update = async (id, userData) => {
    try {
        let data = await User.updateOne({_id: id}, userData);
        return data.nModified !== 0;
    } catch(err) {
        console.log(err);
    }
};

const updatePartial = async (id, userData) => {
    try {
        let data = await User.updateOne({ _id: id }, userData);
        return data.nModified !== 0;
    } catch (err) {
        console.log(err);
    }
};

const remove = async (id) => {
    try {
        let data = await User.deleteOne({ _id: id });
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