const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { routeIdNumbers } = require('../services');

const getAllRouteIdNumbers = catchAsync(async (req, res) => {
    const routes = await routeIdNumbers.getAllRouteIdNumbers();
    res.status(httpStatus.OK).send(routes);
});

const getRouteIdNumber = catchAsync(async (req, res) => {
    console.log(req.query._id);
    const route = await routeIdNumbers.getRouteIdNumber(req.query._id);
    res.status(httpStatus.OK).send(route);
});

module.exports = {
    getAllRouteIdNumbers,
    getRouteIdNumber,
}