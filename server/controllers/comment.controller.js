const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');

const createComment = catchAsync(async (req, res) => {
    const comment = await commentService.createComment(req.body);
    res.status(httpStatus.CREATED).send(comment);
});

const updateComment = catchAsync(async (req, res) => {
    const comment = await commentService.updateComment(req.body.id, req.body.content);
    res.status(httpStatus.OK).send(comment);
})

const getCommentsByPostId = catchAsync(async (req, res) => {
    const comments = await commentService.getCommentsByPostId(req.query.post_id);
    res.status(httpStatus.OK).send(comments);
});

const getCommentByUser = catchAsync(async (req, res) => {
    console.log(req.query.author_id);
    const comments = await commentService.getCommentByUser(req.query.author_id);
    res.status(httpStatus.OK).send(comments);
});

const deleteComment = catchAsync(async (req, res) => {
    const comment = await commentService.deleteCommentById(req.body.id);
    res.status(httpStatus.NO_CONTENT).send(comment);
});

module.exports = {
    createComment,
    updateComment,
    getCommentsByPostId,
    getCommentByUser,
    deleteComment
}