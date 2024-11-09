const express = require('express');

const {
	createTag,
	deleteTag
} = require('../controllers/tag_controller');

const router = express.Router();

router
	.post('/', createTag)
	.delete('/', deleteTag)


module.exports = router;
