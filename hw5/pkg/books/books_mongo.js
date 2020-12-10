const mongoose = require('mongoose');

const Book = mongoose.model(
    'books',
    {
        author: String,
        title: String,
        genre: String
    },
    'books'
);

const getAll = async () => {
    try {
        let data = await Book.find({});
        return data;
    } catch(err) {
        console.log(err);
    }
};

const getOne = async (id) => {
    try {
        let data = await Book.findOne({_id: id});
        return data;
    } catch (err) {
        console.log(err);
    }
};

const save = async (bookData) => {
    try {
        let b = new Book(bookData);
        let data = await b.save();
        return data;
    } catch(err) {
        console.log(err);
    }
};

const update = async (id, bookData) => {
    try {
        let data = await Book.updateOne({_id: id}, bookData);
        return data.nModified !== 0;
    } catch(err) {
        console.log(err);
    }
};

const updatePartial = async (id, bookData) => {
    try {
        let data = await Book.updateOne({ _id: id }, bookData);
        return data.nModified !== 0;
    } catch (err) {
        console.log(err);
    }
};

const remove = async (id) => {
    try {
        let data = await Book.deleteOne({ _id: id });
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