const mongoose = require('mongoose');

const Songs = mongoose.model(
    'songs',
    {
        title: String,
        year: Number,
        performer: String,
        uid: String,
        _deleted: Boolean,
        _public: Boolean,
        uid: String
    },
    'songs'
);

const save = async (songData) => {
    let s = new Songs(songData);
    let data = await s.save();
    return data;
}
const getAll = async () => {
    let data = await Songs.find({ _deleted: false, _public: true });
    return data;
};

const getOne = async (id, uid) => {
    let data = await Songs.find({ _deleted: false, uid: uid, _id:id });
    return data;
};

const getUsersAll = async (uid) => {
    let data = await Songs.find({ uid: uid, _deleted: false });
    return data;
};

const update = async (id, SongData,uid) => {
    let data = await Songs.updateOne({ _id: id, uid:uid, _deleted: false  }, SongData);
    return data.nModified !== 0;
};


const remove = async (id,uid) => {
    let data = await Songs.updateOne({ _id: id, uid:uid }, {_deleted: true});
    return data.nModified !== 0;
};

module.exports = {
    save,
    getAll,
    getUsersAll,
    getOne,
    update,
    remove
}