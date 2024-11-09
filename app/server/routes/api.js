const express = require('express');

const userRouter = require('./user_router');
const postRouter = require('./post_router');
const tagRouter = require('./tag_router');
const commentRouter = require('./comment_router')

const router = express.Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/tags', tagRouter);
router.use('/comments', commentRouter);

module.exports = router;
