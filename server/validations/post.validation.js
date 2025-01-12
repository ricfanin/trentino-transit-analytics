const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPostSchema = {
    body: Joi.object().keys({
        author_id: Joi.string().custom(objectId).required(),
        title: Joi.string().required(),
        content: Joi.string(),
        tags: Joi.array().items(Joi.string().custom(objectId)),
    })
}

const updatePost = {
    body: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
        bodyPost : Joi.object().keys({
            title: Joi.string(),
            content: Joi.string(),
            tags: Joi.array().items(Joi.string().custom(objectId))
        })
    })
}

const getPostByUser = {
    query: Joi.object().keys({
        author_id: Joi.string().custom(objectId).required()
    })
}

const getPostById = {
    query: Joi.object().keys({
        post_id: Joi.string().custom(objectId).required()
    })
}

const getPostByLikes = {
    body: Joi.object().keys({
        tags: Joi.array().items(Joi.string()),
        order: Joi.string().valid('upvote', 'downvote')
    })
}

const getPostByDate = {
    body: Joi.object().keys({
        tags: Joi.array().items(Joi.string()),
        order: Joi.string().valid('newest', 'oldest')
    })
}

const getPostByTags = {
    body: Joi.object().keys({
        tags: Joi.array().items(Joi.string()).required()
    })
}
const deletePost = {
    params: Joi.object().keys({
        postId: Joi.string().custom(objectId),
    })
}

module.exports = {
    createPostSchema,
    updatePost,
    getPostById,
    getPostByUser,
    getPostByLikes,
    getPostByDate,
    getPostByTags,
    deletePost
}