const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegister2Input(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.email)){
        errors.message = "Email field is required";
    }else if (!Validator.isEmail(data.email)) {
        errors.message = "Email is invaild";
    }
    if (Validator.isEmpty(data.password)){
        errors.message = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};