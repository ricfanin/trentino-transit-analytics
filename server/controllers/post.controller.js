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
    const posts = await postService.getPostByUser(req.body.id);
    res.status(httpStatus.OK).send(posts);
});

const getPostByTags = catchAsync(async (req, res) => {
    const posts = await postService.getPostByTags(req.body.tags);
    res.status(httpStatus.OK).send(posts);
});

const getPostByDate = catchAsync(async (req, res) => {
    const posts = await postService.getPostByDate(req.body.tags, req.body.order);
    res.status(httpStatus.OK).send(posts);
})

const getPostByLikes = catchAsync(async (req, res) => {
    const post = await postService.getPostByLikes(req.body.tags, req.body.order);
    res.status(httpStatus.OK).send(post);
});

const deletePost = catchAsync(async (req, res) => {
    const post = await postService.deletePostById(req.body.id);
    res.status(httpStatus.NO_CONTENT).send(post);
});

module.exports = {
    createPost,
    updatePost,
    getPostByUser,
    getPostByTags,
    getPostByDate,
    getPostByLikes,
    deletePost
}