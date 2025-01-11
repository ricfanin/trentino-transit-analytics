const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { routeIdNumbers } = require('../services');

const getAllRouteIdNumbers = catchAsync(async (req, res) => {
    const routes = await routeIdNumbers.getAllRouteIdNumbers();
    res.status(httpStatus.OK).send(routes);
});

module.exports = {
    getAllRouteIdNumbers,
}