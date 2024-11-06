const express = require('express');

const {
	registerUser,
	loginUser,
	readAllUsers,
	readSingleUser,
	updateData,
	deleteData,
} = require('../controllers/user_controller');

const router = express.Router();

router
	.post('/users/register', registerUser)
	.get('/users/login', loginUser)
	.get('/users', readAllUsers)
	.get('/:id', readSingleUser)
	.put('/:id', updateData)
	.delete('/:id', deleteData);

module.exports = router;
