const express = require('express');

const {
	createPost,
	deletePost
} = require('../controllers/post_controller');

const router = express.Router();

router
	.post('/', createPost)
	.delete('/', deletePost)


module.exports = router;
