const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
    body: Joi.object().keys({
        author_id: Joi.string().custom(objectId).required(),
        title: Joi.string().required(),
        content: Joi.string()
    })
}

const deletePost = {
    params: Joi.object().keys({
        postId: Joi.string().custom(objectId),
    })
}

module.exports = {
    createPost,
    deletePost
}