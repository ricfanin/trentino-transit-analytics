const httpStatus = require('http-status');
const { TripsAverageDelay, StopDelays } = require('../models');
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

/**
 * Get all Lines average delays
 * @returns {Promise<Array>}
 */
const getLinesDelays = async (routeId) => {
    try {
        return await TripsAverageDelay.getAverageDelayGroupByLinea();
    }
    catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
};

/**
 * Get all line times average delays
 * @returns {Promise<Array>}
 */
const getLinesDelayByTimes = async (routeId) => {
    try {
        return await TripsAverageDelay.getAverageDelayGroupByStartTrip(routeId);
    }
    catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
};

/**
 * Get all line stop average delays
 * @returns {Promise<Array>}
 */
const getLineDelayWithStops = async (routeId) => {
    try {
        return await StopDelays.getAverageDelayGroupByStopsAllDirection(routeId);
    }
    catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
};


module.exports = {
    getAllTripAverageDelays,
    getLinesDelays,
    getLinesDelayByTimes,
    getLineDelayWithStops,
};
