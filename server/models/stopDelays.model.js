const mongoose = require('mongoose');

const stopDelaySchema = mongoose.Schema(
    {
        stopId: {
            type: Number,
            required: true,
        },
        stopSequence: {
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

stopDelaySchema.statics.getAverageDelayGroupByStops = async function (routeId = null, directionId=0) {
    const pipeline = [
        {
            // Filtro per il routeId specificato, se fornito
            $match: routeId ? { routeId: routeId, direction: directionId } : {},
        },
        {
            // Raggruppa i record per stopId
            $group: {
                _id: '$stopId', // Raggruppa per stopId
                averageDelay: { $avg: '$delay' }, // Calcola la media dei ritardi
                stopSequence: { $first: '$stopSequence' },
            },
        },
        {
            // Ordina per stopSequence (se necessario)
            $sort: { stopSequence: 1 },
        },
        {
            // Unisci con la collection StopNames per ottenere lo stopName
            $lookup: {
                from: 'stopNames', // Nome della collection StopNames
                localField: '_id', // Campo _id nel gruppo corrente (stopId)
                foreignField: 'stopId', // Campo stopId nella collection StopNames
                as: 'stopDetails', // Nome del campo con i risultati uniti
            },
        },
        {
            // Estrai il primo elemento di stopDetails (ci aspettiamo una corrispondenza unica)
            $unwind: '$stopDetails',
        },
        {
            // Proietta i campi desiderati nel risultato finale
            $project: {
                _id: 0,
                stopId: '$_id', // Mantiene lo stopId (opzionale)
                stopName: '$stopDetails.stopName', // Usa lo stopName dalla collection unita
                averageDelay: 1, // Mantieni la media dei ritardi
                stopSequence: 1, // Mantieni la media dei ritardi
            },
        },
    ];
    const result = await this.aggregate(pipeline);
    return result;
};

stopDelaySchema.statics.getAverageDelayGroupByStopsAllDirection = async function (routeId = null) {
    let result = {};
    result.andata = await this.getAverageDelayGroupByStops(routeId, 0);
    result.ritorno = await this.getAverageDelayGroupByStops(routeId, 1);
    return result;
}

/**
 * @typedef StopDelays
 */
const StopDelays = mongoose.model('StopDelays', stopDelaySchema, 'stopDelays');

module.exports = StopDelays;
