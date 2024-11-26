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

module.exports = router;