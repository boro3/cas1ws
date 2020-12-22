const mongoose = require('mongoose');


const Book = mongoose.model(
    'books',
    {
        author: String,
        title: String,
        genre: String,
        pages: Number
    },
    'books'
);

const getAll = async () => {
    let data = await Book.find({});
    return data;
};

const getOne = async (id) => {
    let data = await Book.findOne({ _id: id });
    return data;
};

const save = async (bookData) => {
    let b = new Book(bookData);
    let data = await b.save();
    return data;
};

const update = async (id, bookData) => {
    let data = await Book.updateOne({ _id: id }, bookData);
    return data.nModified !== 0;
};

const updatePartial = async (id, bookData) => {
    let data = await Book.updateOne({ _id: id }, bookData);
    return data.nModified !== 0;
};

const remove = async (id) => {
    let data = await Book.deleteOne({ _id: id });
    return data.deletedCount !== 0;
};

module.exports = {
    getAll,
    getOne,
    save,
    update,
    updatePartial,
    remove
};