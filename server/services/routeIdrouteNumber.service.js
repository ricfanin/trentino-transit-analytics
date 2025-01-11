const { routeIdRouteNumber } = require('../models');

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

module.exports = {
    getAllRouteIdNumbers,
}