const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Validation
const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.empty": 'the "name" field must be filled in',
      "string.min": 'the "name" field must be at least 2 characters long',
      "string.max": 'the "name" field must be at most 30 characters long',
    }),
    weather: Joi.string().required().valid("hot", "warm", "cold").messages({
      "string.empty": 'the "weather" field must be filled in',
      "string.valid":
        'the "weather" field must be one of the following values: hot, warm, cold',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'the "imageUrl" field must be filled in',
      "string.uri": "You must enter a valid URL",
    }),
  }),
});

// User validation
const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.empty": 'the "name" field must be filled in',
      "string.min": 'the "name" field must be at least 2 characters long',
      "string.max": 'the "name" field must be at least 30 characters long',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'the "avatar" field must be filled in',
      "string.uri": "You must enter a valid URL",
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'the "email" field must be filled in',
      "string.email": "You must enter a valid email",
    }),
    password: Joi.string().required().messages({
      "string.empty": 'the "password" field must be filled in',
    }),
  }),
});

// Authentication validation
const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'the "email" field must be filled in',
      "string.email": "You must enter a valid email",
    }),
    password: Joi.string().required().messages({
      "string.empty": 'the "password" field must be filled in',
    }),
  }),
});

// Id validation
const validateId = celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string().required().hex().length(24).messages({
        "string.empty": 'the "id" field must be filled in',
        "string.hex": 'the "id" field must be a hexadecimal string',
        "string.length": 'the "id" field must be 24 characters long',
      }),
    })
    .unknown(true),
});

module.exports = {
  validateClothingItem,
  validateUser,
  validateAuthentication,
  validateId,
};
