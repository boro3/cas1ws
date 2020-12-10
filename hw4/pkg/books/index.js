const jsonf = require('../files');

const dataFile = './books.json';

const getAll = async () => {
    let data = await jsonf.readJSONFile(dataFile);
    return data;
};

const getOne = async (id) => {
    let data = await jsonf.readJSONFile(dataFile);
    let res = data.filter(u => u.id === Number(id));
    return res[0];
};

const save = async (bookData) => {
    let data = await jsonf.readJSONFile(dataFile);
    let id = 1;
    if (data.length > 0) {
        id = data[data.length - 1].id + 1;
    }
    bookData = {
        id,
        ...bookData
    };

    data = [
        ...data,
        bookData
    ];
    await jsonf.writeJSONFile(dataFile, data);
    return bookData;
};

const update = async (id, bookData) => {
    let data = await jsonf.readJSONFile(dataFile);
    let changed = false;
    data = data.map(b => {
        if (b.id === Number(id)) {
            b = { id: Number(id), ...bookData };
            changed = true;
        }
        return b;
    });
    await jsonf.writeJSONFile(dataFile, data);
    return changed;
};

const updatePartial = async (id, bookData) => {
    let data = await jsonf.readJSONFile(dataFile);
    let changed = false;
    data = data.map(b => {
        if (b.id === Number(id)) {
            for (k in bookData) {
                b[k] = bookData[k];
            }
            changed = true;
        }
        return b;
    });
    await jsonf.writeJSONFile(dataFile, data);
    return changed;
};

const remove = async (id) => {
    let data = await jsonf.readJSONFile(dataFile);
    let changed = false;
    data = data.filter(b => {
        if (b.id !== Number(id)) {
            changed = true;
            return true;
        }
        return false;
    });
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
};