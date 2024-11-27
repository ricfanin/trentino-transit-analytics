const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

const createPost = async (postBody) => {
    return Post.create(postBody);
}

const getPostByUser = async (userId) => {
    const posts = await Post.find({author_id: userId});
    return posts; 
} 

const getPostByLikes = async (tags, order) => {
    const posts = await getPostByTags(tags);
    if(order == 'upvote') {
        return posts.sort((a, b) => b.upvote - a.upvote);
    } else {
        return posts.sort((a, b) => a.downvote - b.downvote);
    }
};

const getPostByTags = async (tags) => {
    const posts = await Post.find({tags: {$in: tags}})
    if(!posts){
        throw new ApiError(httpStatus.NOT_FOUND, "Post not found")
    }
    return posts;
};

const deletePostById = async (id) => {
    const post = await Post.findByIdAndDelete(id);
    if(!post) {
        throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
    }
    return post;
}

module.exports = {
    createPost,
    getPostByUser,
    getPostByTags,
    getPostByLikes,
    deletePostById
}