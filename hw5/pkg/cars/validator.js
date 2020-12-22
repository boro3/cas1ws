const { Validator } = require('node-input-validator');

const carSchema = {
    manufacturer: 'required|string',
    model: `required|string`,
    type: `required|minLength:3|string`
};

const carUpdatePartialSchema = {
    manufacturer: 'string',
    model: `string`,
    type: `minLength:3|string`
};

const validate = async (data, schema) => {
    let v = new Validator(data, schema);
    let e = await v.check();
    if (!e) {
        throw v.errors;
    }
};

module.exports = {
    carSchema,
    carUpdatePartialSchema,
    validate
}