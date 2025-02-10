const httpStatus = require('http-status');
const { Comment } = require('../models');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');

const createComment = async (commentBody) => {
    const comment = await Comment.create(commentBody);
    const post = await Post.findByIdAndUpdate(commentBody.post_id, { $push: { comments : comment._id } },{ new: true } )
    return comment;
}

const updateComment = async (commentID, commentBody) => {
    const updatedComment = await Comment.findByIdAndUpdate(commentID, {content: commentBody, updatedAt: Date.now()}, {new: true});

    if(!updatedComment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
    }

    return updatedComment;
}

const getCommentsByPostId = async(postId) => {
    const objectIdPostId = new mongoose.Types.ObjectId(`${postId}`);

    const comments = await Comment.aggregate([
        { $match: { post_id: objectIdPostId  } }, 
        {
            $lookup: {
                from: "users",
                localField: "author_id",
                foreignField: "_id",
                as: "author",
            },
        },
        { $unwind: "$author" },
        {
            $project: {
                "author.username": 1,
                "author._id": 1,
                post_id: 1,
                content: 1,
                createdAt: 1,
                updatedAt: 1,
                upvote: 1,
                downvote: 1,
                _id: 1,
            },
        },
    ]);
    return comments
}

const getCommentByUser = async (userId) => {
    const comments = await Comment.find({author_id: userId});
    return comments; 
} 

const deleteCommentById = async (id) => {
    const comment = await Comment.findByIdAndDelete(id);
    if(!comment) {
        throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
    }
    const post = await Post.findByIdAndUpdate(comment.post_id, { $pull: { comments : comment._id } },{ new: true } )
    return comment;
}

module.exports = {
    createComment,
    updateComment,
    getCommentsByPostId,
    getCommentByUser,
    deleteCommentById
}