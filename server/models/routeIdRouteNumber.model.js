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
        color: {
            type: String,
            required: true,
            match: /^#([0-9A-Fa-f]{6})$/, // Valida il formato esadecimale (#RRGGBB)
        },
    }
);

routeIdRouteNumberSchema.statics.getAllRecords = async function () {
    return await this.find({}, { routeId: 1, routeNumber: 1, color: 1, _id: 1 }).sort({ routeNumber: 1 });
};

routeIdRouteNumberSchema.statics.getRecordById = async function (id) {
    return await this.findOne({ _id: id }, { routeId: 1, routeNumber: 1, color: 1, _id: 1});
};

/**
 * @typedef RouteIdRouteNumber
 */
const RouteIdRouteNumber = mongoose.model('routeIdRouteNumber', routeIdRouteNumberSchema, 'routeIdRouteNumber');

module.exports = RouteIdRouteNumber;
