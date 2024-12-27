const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { create } = require('../models/vote.model');

const createVote = {
    body: Joi.object().keys({
        user_id: Joi.string().custom(objectId).required(),
        post_id: Joi.string().custom(objectId).required(),
        voteType: Joi.string().valid('upvote', 'downvote').required()
    })
}

const getVotesByUser = {
    body: Joi.object().keys({
        author_id: Joi.string().custom(objectId).required()
    })
}

const deleteVote = {
    params: Joi.object().keys({
        commentId: Joi.string().custom(objectId),
    })
}

module.exports = {
    createVote,
    getVotesByUser,
    deleteVote
}