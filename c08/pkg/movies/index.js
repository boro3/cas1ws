const mongoose = require('mongoose');

const Movies = mongoose.model(
    'moveis',
    {
        name: String,
        year: Number,
        director: String,
        uid: String
    },
    'movies'
);

const save = async(data)=>{
    let m = new Movies(data);
    return await m.save();
}

const getAll = async () => {
    let data = await User.find({uid});
    return data;
};

module.exports={
    save,
    getAll
}