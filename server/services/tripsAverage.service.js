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
 * Get specic line times average delays
 * @returns {Promise<Array>}
 */
// const getLineDelayByTimes = async () => {
//     try {
//         return await TripsAverageDelay.getAverageDelayGroupByLinea();
//     }
//     catch (error) {
//         throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
//     }
// };

module.exports = {
    getAllTripAverageDelays,
    getLinesDelays,
    getLinesDelayByTimes,
};
