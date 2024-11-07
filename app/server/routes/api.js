const express = require('express');

const {
	registerUser,
	loginUser,
	logoutUser,
	profilePage,
	readAllUsers,
	readSingleUser,
	updateData,
	deleteData,
} = require('../controllers/user_controller');

const router = express.Router();

router
	.post('/users/register', registerUser)
	.post('/users/login', loginUser)
	.post('/users/logout', logoutUser)
	.get('/users', readAllUsers)
	.get('/me', profilePage)
	.get('/:id', readSingleUser)
	.put('/:id', updateData)
	.delete('/:id', deleteData);

module.exports = router;
