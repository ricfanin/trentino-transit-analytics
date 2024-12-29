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

/**
 * @typedef TripAverageDelay
 */
const TripAverageDelay = mongoose.model('tripsAverageDelay', tripAverageDelaySchema, 'tripsAverageDelay');

module.exports = TripAverageDelay;
