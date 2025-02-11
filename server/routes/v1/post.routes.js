const express = require('express');
const validate = require('../../middlewares/validate')
const postController = require('../../controllers/post.controller');
const postValidation = require('../../validations/post.validation');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
    .route('/')
    .post(auth(), validate(postValidation.createPostSchema), postController.createPost)
    .patch(auth(), validate(postValidation.updatePost), postController.updatePost)
    .get(auth(), validate(postValidation.getPostById), postController.getPostById)

router
    .route('/:postId')
    .delete(auth(), validate(postValidation.deletePost), postController.deletePost);


router
    .route('/filter/user')
    .get(validate(postValidation.getPostByUser), postController.getPostByUser);  
    
router
    .route('/filter/likes')
    .get(validate(postValidation.getPostByLikes), postController.getPostByLikes)
    
router
    .route('/filter/date')
    .get(validate(postValidation.getPostByDate), postController.getPostByDate);


module.exports = router;