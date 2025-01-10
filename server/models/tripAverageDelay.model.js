const mongoose = require('mongoose');

const tripAverageDelaySchema = mongoose.Schema(
    {
        routeName: {
            type: String,
            required: true,
            trim: true,
        },
        routeId: {
            type: Number,
            required: true,
        },
        direction: {
            type: Number,
            required: true,
            enum: [0, 1],
        },
        date: {
            type: Date,
            required: true,
        },
        tripId: {
            type: String,
            required: true,
            trim: true,
        },
        startTripTime: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(v);
                },
                message: (props) => `${props.value} is not a valid time format (HH:mm:ss)!`,
            },
        },
        endTripTime: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(v);
                },
                message: (props) => `${props.value} is not a valid time format (HH:mm:ss)!`,
            },
        },
        delay: {
            type: Number,
            required: true,
        },
    }
);


tripAverageDelaySchema.statics.getAverageDelayGroupByLinea = async function () {
    const result = await TripAverageDelay.aggregate([
        {
            // Raggruppa per linea (routeName) e calcola la media dei ritardi
            $group: {
                _id: '$routeId',
                averageDelay: { $avg: '$delay' },
            },
        },
        {
            // Rinomina il campo _id in routeName
            $project: {
                _id: 0,
                routeId: '$_id',
                averageDelay: 1,
            },
        },
    ]);

    return result;
};

/**
 * @typedef TripAverageDelay
 */
const TripAverageDelay = mongoose.model('tripsAverageDelay', tripAverageDelaySchema, 'tripsAverageDelay');

module.exports = TripAverageDelay;
