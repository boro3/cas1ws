const mongoose = require('mongoose');

const Games = mongoose.model(
    'games',
    {
        title: String,
        year: Number,
        genre: String,
        uid: String,
        _deleted: Boolean,
        _public: Boolean,
        uid: String
    },
    'games'
);

const save = async (gameData) => {
    let s = new Games(gameData);
    let data = await s.save();
    return data;
}
const getOne = async (id, uid) => {
    let data = await Games.find({ _deleted: false, uid: uid, _id:id });
    return data;
}

const getAll = async () => {
    let data = await Games.find({ _deleted: false, _public: true });
    return data;
};

const getUsersAll = async (uid) => {
    let data = await Games.find({ uid: uid, _deleted: false });
    return data;
};

const update = async (id, GameData,uid) => {
    let data = await Games.updateOne({ _id: id, uid:uid, _deleted: false  }, GameData);
    return data.nModified !== 0;
};


const remove = async (id,uid) => {
    let data = await Games.updateOne({ _id: id, uid:uid }, {_deleted: true});
    return data.deletedCount !== 0;
};

module.exports = {
    save,
    getAll,
    getUsersAll,
    getOne,
    update,
    remove
}