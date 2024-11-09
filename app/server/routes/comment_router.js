const express = require('express');

const {
	createComment,
	deleteComment
} = require('../controllers/comment_controller');

const router = express.Router();

router
	.post('/', createComment)
	.delete('/', deleteComment)


module.exports = router;
