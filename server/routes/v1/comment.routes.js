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
    .delete(auth(), validate(commentValidation.deleteComment), commentController.deleteComment)
    .get(auth(), validate(commentValidation.getCommentById), commentController.getCommentByUser);

router
    .route('/post')
    .get(auth(), validate(commentValidation.getCommentsByPostId), commentController.getCommentsByPostId);

module.exports = router;