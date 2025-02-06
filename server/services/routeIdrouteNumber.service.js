const { routeIdRouteNumber } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Get all routeIdRouteNumber records
 * @returns {Promise<Array>}
 */
const getAllRouteIdNumbers = async () => {
    const routes = await routeIdRouteNumber.getAllRecords();
    if (!routes || routes.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No routes records found');
    }
    return routes;
};

const getRouteIdNumber = async (routeId) => { 
    const route = await routeIdRouteNumber.getRecordById(routeId);
    if(!route) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Route not found');
    }
    return route;
}

module.exports = {
    getAllRouteIdNumbers,
    getRouteIdNumber,
}