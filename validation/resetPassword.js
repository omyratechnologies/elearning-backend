const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRestPassword(data){
    let errors = {};

    data.password = !isEmpty(data.password) ? data.password : "";

    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

    if (Validator.isEmpty(data.password)){
        errors.message = "Password field is required";
    }
    if (Validator.isEmpty(data.confirmPassword)){
        errors.message = "Confirm password field is required";
    }

    if(!Validator.equals(data.password, data.confirmPassword)) {
       errors.message = "Password must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};