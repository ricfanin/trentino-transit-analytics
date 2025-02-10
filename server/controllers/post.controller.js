const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');

const createPost = catchAsync(async (req, res) => {
    const post = await postService.createPost(req.body);
    res.status(httpStatus.CREATED).send(post);
});

const updatePost = catchAsync(async (req, res) => {
    const post = await postService.updatePost(req.body.id, req.body.bodyPost);
    res.status(httpStatus.OK).send(post);
})

const getPostByUser = catchAsync(async (req, res) => {
    const {author_id} = req.query;
    console.log(author_id);
    const posts = await postService.getPostByUser(author_id);
    res.status(httpStatus.OK).send(posts);
});

const getPostById = catchAsync(async (req, res) => {
    const {post_id} = req.query;
    const post = await postService.getPostById(post_id);
    res.status(httpStatus.OK).send(post);
});


const getPostByTags = catchAsync(async (req, res) => {
    const posts = await postService.getPostByTags(req.query.tags);
    res.status(httpStatus.OK).send(posts);
});

const getPostByDate = catchAsync(async (req, res) => {
    const tags = req.query.tags ? req.query.tags.split(',') : [];
    const posts = await postService.getPostByDate(tags, req.query.order);
    res.status(httpStatus.OK).send(posts);
})

const getPostByLikes = catchAsync(async (req, res) => {
    const tags = req.query.tags ? req.query.tags.split(',') : [];
    const post = await postService.getPostByLikes(tags, req.query.order);
    res.status(httpStatus.OK).send(post);
});

const deletePost = catchAsync(async (req, res) => {
    const post = await postService.deletePostById(req.params.postId);
    res.status(httpStatus.NO_CONTENT).send(post);
});

module.exports = {
    createPost,
    updatePost,
    getPostByUser,
    getPostById,
    getPostByTags,
    getPostByDate,
    getPostByLikes,
    deletePost
}