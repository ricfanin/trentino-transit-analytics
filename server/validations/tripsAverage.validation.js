const Joi = require('joi');

const getLinesDelaysByTimesValidation = {
  query: Joi.object().keys({
    routeId: Joi.number().integer().optional(),
  }),
};

module.exports = {
  getLinesDelaysByTimesValidation,
};