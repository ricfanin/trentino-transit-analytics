const express = require('express');
const validate = require('../../middlewares/validate')
const tripsAverageDelayController = require('../../controllers/tripsAverageDelay.controller');
const auth = require('../../middlewares/auth');


const router = express.Router();

router
    .route('/')
    .get(auth(), tripsAverageDelayController.getAllTripsAverageDelays)

module.exports = router;