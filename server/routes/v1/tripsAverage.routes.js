const express = require('express');
const validate = require('../../middlewares/validate')
const { tripsValidation } = require('../../validations');
const tripsAverageDelayController = require('../../controllers/tripsAverageDelay.controller');
const auth = require('../../middlewares/auth');


const router = express.Router();

router
    .route('/')
    .get(auth(), tripsAverageDelayController.getAllTripsAverageDelays)

router
    .route('/lines')
    .get(auth(), tripsAverageDelayController.getLinesDelays);

router
    .route('/times')
    .get(auth(), validate(tripsValidation.getLinesDelaysByTimesValidation), tripsAverageDelayController.getLinesDelaysByTimes);

module.exports = router;