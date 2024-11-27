const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

const createPost = async (postBody) => {
    return Post.create(postBody);
}

const updatePost = async (postID, postBody) => {

    const updatedPost = await Post.findByIdAndUpdate(postID, {title: postBody.title, content: postBody.content, tags: postBody.tags, updatedAt: Date.now()}, {new: true});

    if(!updatedPost) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
    }

    return updatedPost;
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

const getPostByDate = async(tags, order) =>{
    const posts = await getPostByTags(tags);
    
    if(order === 'newest'){
        return posts.sort((a, b) => b.createdAt - a.createdAt);
    } else {
        return posts.sort((a, b) => a.createdAt - b.createdAt);
    }
}

const getPostByTags = async (tags) => {

    let posts;

    if(tags.length === 0){
        posts = await Post.find();
    } else {
        posts = await Post.find({tags: {$in: tags}})
    }

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
    updatePost,
    getPostByUser,
    getPostByDate,
    getPostByTags,
    getPostByLikes,
    deletePostById
}