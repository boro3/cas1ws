const { Validator } = require('node-input-validator');

const userSchema = {
    first_name: 'required|minLength:3:string',
    last_name: 'required|minLength:4:string'
};

const userPartialUpdateSchema = {
    first_name: 'minLength:3|string',
    last_name: 'minLength:4:string'
};

const validate = async (data, schema) => {
    let v = new Validator(data, schema);
    let e= await v.check();
    if(!e){
        throw v.errors;
    }
};

module.exports = {
    userSchema,
    userPartialUpdateSchema,
    validate
}