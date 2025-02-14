const express = require('express');
const validate = require('../../middlewares/validate')
const { tripsValidation } = require('../../validations');
const tripsAverageDelayController = require('../../controllers/tripsAverageDelay.controller');
const auth = require('../../middlewares/auth');


const router = express.Router();

router
    .route('/')
    .get(auth('getLinesData'), tripsAverageDelayController.getAllTripsAverageDelays)

router
    .route('/lines')
    .get(auth('getLinesData'), tripsAverageDelayController.getLinesDelays);

router
    .route('/times')
    .get(auth('getLinesData'), validate(tripsValidation.routeIdValidation), tripsAverageDelayController.getLinesDelaysByTimes);

router
    .route('/stops')
    .get(auth('getLinesData'), validate(tripsValidation.routeIdValidation), tripsAverageDelayController.getLineDelaysWithStops);

module.exports = router;