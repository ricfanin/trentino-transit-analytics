const Joi = require('joi');

const routeIdValidation = {
  query: Joi.object().keys({
    routeId: Joi.number().integer().optional(),
    directionId: Joi.number().integer().optional(),
  }),
};

module.exports = {
  routeIdValidation,
};