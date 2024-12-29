const express = require('express');
const profileController = require('../../controllers/profile.controller');
const auth = require('../../middlewares/auth');


const router = express.Router();

router
    .route('/')
    .get(auth(), profileController.getAuthProfile)

module.exports = router;
