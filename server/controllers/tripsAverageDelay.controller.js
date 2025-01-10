const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { tripsAverageService } = require('../services');

const getAllTripsAverageDelays = catchAsync(async (req, res) => {
    const trips = await tripsAverageService.getAllTripAverageDelays();
    res.status(httpStatus.OK).send(trips);
});

const getLinesDelays = catchAsync(async (req, res) => {
    const linesDelays = await tripsAverageService.getLinesDelays();
    res.status(httpStatus.OK).send(linesDelays);
});

const getLinesDelaysByTimes = catchAsync(async (req, res) => {
    const linesDelays = await tripsAverageService.getLinesDelayByTimes();
    res.status(httpStatus.OK).send(linesDelays);
});

module.exports = {
    getAllTripsAverageDelays,
    getLinesDelays,
    getLinesDelaysByTimes,
}