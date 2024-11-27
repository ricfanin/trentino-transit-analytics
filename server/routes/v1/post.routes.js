const express = require('express');
const validate = require('../../middlewares/validate')
const postController = require('../../controllers/post.controller');
const postValidation = require('../../validations/post.validation');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
    .route('/')
    .post(auth(), validate(postValidation.createPost), postController.createPost)
    .delete(auth(), validate(postValidation.deletePost), postController.deletePost)
    .get(auth(), validate(postValidation.getPostById), postController.getPostByUser)

router
    .route('/feed/tags')
    .get(validate(postValidation.getPostByTags), postController.getPostByTags)

router
    .route('/feed/likes')
    .get(validate(postValidation.getPostByLikes), postController.getPostByLikes)

module.exports = router;