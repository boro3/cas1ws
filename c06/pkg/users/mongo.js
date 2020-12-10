const mongoose = require('mongoose');

const User = mongoose.model(
    'users',
    {
        first_name: String,
        last_name: String
    },
    'users'
)
const getAll = async () => {
    try {
        let data = await User.find();
        return data;
    } catch (err) {
        console.log(err);
    }
};

const getOne = async (id) => {
    try {
        let data = await User.find({_id:id});
        return data;
    } catch (err) {
        console.log(err);
    }
};

const save = async (userData) => {
    try {
        let u = new User(userData);
        await u.save();
        let data = await User.find();
    } catch (err) {
        console.log(err);
    }
};

const update = async (id, userData) => {
    let data = await jsonf.readJSONFile(dataFile);
    let change = false;
    data = data.map(u => {
        if (u.id == Number(id)) {
            u = { id: id, ...userData }
            change = true
        }
        return u;
    });
    await jsonf.writeJSONFile(dataFile, data);
    return change;
};

const updatePartial = async (id, userData) => {
    let data = await jsonf.readJSONFile(dataFile);
    let change = false;
    data = data.map(u => {
        if (u.id === id) {
            // u=userData;
            for (k in userData) {
                u[k] = userData[k];
            }
            change = true;
        }
        return u;
    });
    await jsonf.writeJSONFile(dataFile, data);
    return changed;
};

const remove = async (id) => {
    let data = await jsonf.readJSONFile(dataFile);
    let change = false;
    data = data.filter(u => u.id !== id);
    change = true;
    await jsonf.writeJSONFile(dataFile, data);
    return changed;
};

module.exports = {
    getAll,
    getOne,
    save,
    update,
    updatePartial,
    remove
}