const express = require('express');
const validate = require('../../middlewares/validate')
const { RouteIdNumbers } = require('../../controllers');
const auth = require('../../middlewares/auth');


const router = express.Router();

router
    .route('/')
    .get(auth(), RouteIdNumbers.getAllRouteIdNumbers)

module.exports = router;