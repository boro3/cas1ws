const { Validator } = require('node-input-validator');

const postSchema = {
    title: 'required|minLength:3',
    publish_date: 'required',
    description: 'required|minLength:4',
    content: 'required',
    tags: 'required'
};

const validate = async (data, schema) => {
    let v = new Validator(data, schema);
    let e = await v.check();
    if (!e) {
        throw v.errors;
    }
};

module.exports = {
    postSchema,
    validate
};