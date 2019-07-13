const Joi = require('@hapi/joi');

const loginValidator = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = () => loginValidator;
