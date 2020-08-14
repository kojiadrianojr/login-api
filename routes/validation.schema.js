const Joi = require("@hapi/joi");
const { schema } = require("@hapi/joi/lib/compile");

const validateRegister = (payload) => {
  let schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string()
      .required(),
    confirm_password: Joi.ref("password"),
    username: Joi.string().alphanum().min(6).required(),
  });

  return schema.validate(payload);
};

const validateLogin = (payload) => {
  let schema = Joi.object({
    username: Joi.string().alphanum().min(6).required(),
    password: Joi.string()
      .required(),
  });
  return schema.validate(payload);
};

module.exports = {
  validateRegister,
  validateLogin,
};
