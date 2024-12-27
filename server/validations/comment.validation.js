const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createComment = {
    body: Joi.object().keys({
        author_id: Joi.string().custom(objectId).required(),
        post_id: Joi.string().custom(objectId).required(),
        content: Joi.string(),
    })
}

const updateComment = {
    body: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
        content: Joi.string(),
    })
}

const getCommentByUser = {
    body: Joi.object().keys({
        author_id: Joi.string().custom(objectId).required()
    })
}

const deleteComment = {
    params: Joi.object().keys({
        commentId: Joi.string().custom(objectId),
    })
}

module.exports = {
    createComment,
    updateComment,
    getCommentByUser,
    deleteComment
}