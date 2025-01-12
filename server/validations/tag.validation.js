const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTag = {
    body: Joi.object().keys({
        name: Joi.string().required()
    }),
};

const getTagById = {
    params: Joi.object().keys({
        tagId: Joi.string().custom(objectId),
    })
};

const deleteTag = {
    params: Joi.object().keys({
        tagId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createTag,
    getTagById,
    deleteTag,
};