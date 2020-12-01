const jsonf = require('../files')
const dataFile = './users.json';

const getAll = async () => {
    let data = await jsonf.readJSONFile(dataFile);
    return data;
};

const getOne = async (id) => {
    let data = await jsonf.readJSONFile(dataFile);
    let res = data.filter(u => u.id == Number(id));
    return res[0];
};

const save = async (userData) => {
    let data = await jsonf.readJSONFile(dataFile);
    let id = data[data.length - 1].id + 1;
    userData = {
        id,
        ...userData
    };
    data = [
        ...data,
        userData
    ];
    await jsonf.writeJSONFile(dataFile, data);
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