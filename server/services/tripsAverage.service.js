const httpStatus = require('http-status');
const { TripsAverageDelay } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Get all TripAverageDelay records
 * @returns {Promise<Array>}
 */
const getAllTripAverageDelays = async () => {
    const delays = await TripsAverageDelay.find({});
    if (!delays || delays.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No TripAverageDelay records found');
    }
    return delays;
};

module.exports = {
    getAllTripAverageDelays,
};
