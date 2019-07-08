const Joi = require('@hapi/joi');

const loginValidator = Joi.object().keys({
  username: Joi.string().required(),
  passowrd: Joi.string().required()
});

module.exports = () => loginValidator;
