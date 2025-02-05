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

const getPostById = async (postId) => {
    const post = await Post.findById(postId)
                    .populate('author_id', 'name')
                    .exec(); 
    return post; 
} 

const getPostByUser = async (userId) => {
    const posts = await Post.find( {"author_id.id": userId} )                    
                                .populate('author_id', 'name')
                                .exec(); 
    return posts; 
} 

const getPostByLikes = async (tags, order) => {
    const posts = await getPostByTags(tags);

    // Aggiungi il calcolo dello score (upvote - downvote)
    posts.forEach(post => {
        post.netScore = post.upvote - post.downvote;
    });

    // Ordina i post in base al valore di netScore
    if (order === 'upvote') {
        return posts.sort((a, b) => b.netScore - a.netScore); // Decrescente
    } else if (order === 'downvote') {
        return posts.sort((a, b) => a.netScore - b.netScore); // Crescente
    } else {
        throw new Error('Invalid order type. Use "upvote" or "downvote".');
    }
};

const getPostByDate = async(tags, order) =>{

    const posts = await getPostByTags(tags);
    
    if(order === 'newest'){
        return posts.sort((a, b) => b.createdAt - a.createdAt);
    } else  if (order === 'oldest') {
        return posts.sort((a, b) => a.createdAt - b.createdAt);
    }
}

const getPostByTags = async (tags) => {

    let posts;

    if(tags.length === 0){
        posts = await Post.find() 
                            .populate('author_id', 'name')
                            .exec(); 
    } else {
        posts = await Post.find({tags: {$in: tags}})
                            .populate('author_id', 'name')
                            .exec(); 
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
    getPostById,
    getPostByUser,
    getPostByDate,
    getPostByTags,
    getPostByLikes,
    deletePostById
}