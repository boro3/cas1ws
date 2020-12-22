const { Validator } = require('node-input-validator');

const bookSchema = {
    author: 'required|minLength:5|maxLength:50|string',
    title: 'required|minLength:3|maxLength:50|string',
    genre: 'required|minLength:3|string',
    pages: 'required|minLength:1|integer'
};

const bookPartialUpdateSchema = {
    author: 'minLength:5|maxLength:50|string',
    title: 'minLength:3|maxLength:50|string',
    genre: 'minLength:3|string',
    pages: 'minLength:1|integer'
};

const validate = async (data, schema) => {
    let v = new Validator(data, schema);
    let e = await v.check();
    if (!e) {
        throw v.errors;
    }
};

module.exports = {
    bookSchema,
    bookPartialUpdateSchema,
    validate
}