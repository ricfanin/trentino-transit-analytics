const mongoose = require('mongoose');

const stopDelaySchema = mongoose.Schema(
    {
        stopId: {
            type: Number,
            required: true,
        },
        stopTime: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(v);
                },
                message: (props) => `${props.value} is not a valid time format (HH:mm:ss)!`,
            },
        },
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
        tripId: {
            type: String,
            required: true,
            trim: true,
        },
        delay: {
            type: Number,
            required: true,
        },
    },
);

stopDelaySchema.statics.getAverageDelayGroupByStops = async function (routeId = null) {
    const pipeline = [
        {
            // Filtro per il routeId specificato
            $match: {
                routeId: routeId,
            },
        },
        {
            // Raggruppa i record per stopId
            $group: {
                _id: '$stopId', // Raggruppa per stopId
                averageDelay: { $avg: '$delay' }, // Calcola la media dei ritardi
            },
        },
        {
            // Ordina per stopId (opzionale)
            $sort: { stopSequence: 1 },
        },
        {
            $project: {
                _id: 0,
                stopId: '$_id',
                averageDelay: 1,
            },
        },
        ]

    const result = await this.aggregate(pipeline);
    return result;
};

/**
 * @typedef StopDelays
 */
const StopDelays = mongoose.model('StopDelays', stopDelaySchema, 'stopDelays');

module.exports = StopDelays;
