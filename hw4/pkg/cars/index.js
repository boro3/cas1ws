const jsonf = require('../files');

const dataFile = './cars.json';

const getAll = async () => {
    let data = await jsonf.readJSONFile(dataFile);
    return data;
};

const getOne = async (id) => {
    let data = await jsonf.readJSONFile(dataFile);
    let res = data.filter(c => c.id === Number(id));
    return res[0];
};

const save = async (carData) => {
    let data = await jsonf.readJSONFile(dataFile);
    let id = data[data.length - 1].id + 1;
    carData = {
        id,
        ...carData
    };

    data = [
        ...data,
        carData    
    ];
    await jsonf.writeJSONFile(dataFile, data);
    return carData;
};

const update = async (id, carData) => {
    let data = await jsonf.readJSONFile(dataFile);
    let changed = false;
    data = data.map(c => {
        if(c.id === Number(id)) {
            c = { id: Number(id), ...carData};
            changed = true;
        }
        return c;
    });
    await jsonf.writeJSONFile(dataFile, data);
    return changed;
};

const updatePartial = async (id, carData) => {
    let data = await jsonf.readJSONFile(dataFile);
    let changed = false;
    data = data.map(c => {
        if (c.id === Number(id)) {
            for(k in carData) {
                c[k] = carData[k];
            }
            changed = true;
        }
        return c;
    });
    await jsonf.writeJSONFile(dataFile, data);
    return changed;
};

const remove = async (id) => {
    let data = await jsonf.readJSONFile(dataFile);
    let changed = false;
    data = data.filter(c => {
        if(c.id !== Number(id)) {
            changed = true;
            return true;
        }
        return false;
    });
    await jsonf.writeJSONFile(dataFile, data);
    return changed;
};

const getByManufacturer = async (manufacturer) =>{
    let data = await jsonf.readJSONFile(dataFile);
    let res = data.filter(c => c.manufacturer === manufacturer);
    return res;
}

module.exports = {
    getAll,
    getOne,
    save,
    update,
    updatePartial,
    remove,
    getByManufacturer
};