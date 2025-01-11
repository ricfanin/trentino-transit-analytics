const mongoose = require('mongoose');

const routeIdRouteNumberSchema = mongoose.Schema(
    {
        routeId: {
            type: Number,
            required: true,
        },
        routeNumber: {
            type: Number,
            required: true,
        },
    }
);

routeIdRouteNumberSchema.statics.getAllRecords = async function () {
    return await this.find({}, {routeId: 1, routeNumber: 1, _id: 0});
};

/**
 * @typedef RouteIdRouteNumber
 */
const RouteIdRouteNumber = mongoose.model('routeIdRouteNumber', routeIdRouteNumberSchema, 'routeIdRouteNumber');

module.exports = RouteIdRouteNumber;
