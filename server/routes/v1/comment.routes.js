const express = require('express');
const validate = require('../../middlewares/validate')
const commentController = require('../../controllers/comment.controller');
const commentValidation = require('../../validations/comment.validation');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
    .route('/')
    .post(auth(), validate(commentValidation.createComment), commentController.createComment)
    .patch(auth(), validate(commentValidation.updateComment), commentController.updateComment)

router
    .route('/:commentId')
    .delete(auth(), validate(commentValidation.deleteComment), commentController.deleteComment);

router
    .route('/post')
    .get(auth(), validate(commentValidation.getCommentsByPostId), commentController.getCommentsByPostId);

router
    .route('/user')
    .get(auth(), validate(commentValidation.getCommentByUser), commentController.getCommentByUser);

module.exports = router;