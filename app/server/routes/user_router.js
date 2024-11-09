const express = require('express');

const {
	registerUser,
	loginUser,
	logoutUser,
	profilePage,
	readAllUsers
} = require('../controllers/user_controller');

const router = express.Router();

router
	.post('/register', registerUser)
	.post('/login', loginUser)
	.post('/logout', logoutUser)
	.get('/', readAllUsers)
	.get('/me', profilePage)


module.exports = router;