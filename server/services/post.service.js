const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

const createPost = async (postBody) => {
    return Post.create(postBody);
}

const getPostById = async (postId) => {
    return Post.findById(postId);
}

const deletePostById = async (postId) => {
    const post = await getPostById(postId);
    if(!post) {
        throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
    }
    await post.remove();
    return post;
}

module.exports = {
    createPost,
    getPostById,
    deletePostById
}