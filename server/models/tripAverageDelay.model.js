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
            // Raggruppa per linea (routeId) e calcola la media dei ritardi
            $group: {
                _id: '$routeId',
                averageDelay: { $avg: '$delay' },
            },
        },
        {
            // Unisci con la collection routeIdRouteNumber per ottenere il routeNumber
            $lookup: {
                from: 'routeIdRouteNumber', // Nome della collection con routeId e routeNumber
                localField: '_id', // Campo della collection corrente (TripAverageDelay)
                foreignField: 'routeId', // Campo nella collection routeIdRouteNumber
                as: 'routeDetails', // Nome dell'array di risultati uniti
            },
        },
        {
            // Estrai il primo elemento dell'array 'routeDetails' (ci aspettiamo una corrispondenza unica)
            $unwind: '$routeDetails',
        },
        {
            // Proietta i campi desiderati nel risultato finale
            $project: {
                _id: 0,
                routeNumber: '$routeDetails.routeNumber', // Usa il routeNumber dalla collection unita
                averageDelay: 1, // Mantieni la media dei ritardi
            },
        },
    ]);

    return result;
};

tripAverageDelaySchema.statics.getAverageDelayGroupByStartTrip = async function (routeId = null) {
    const matchStage = routeId ? { $match: { routeId: routeId } } : null; // Condizionale per il filtro
    const pipeline = [
        // Filtro opzionale su routeId
        ...(matchStage ? [matchStage] : []),
        {
            // Proietta un nuovo campo con il solo orario (senza secondi)
            $project: {
                hour: { $substr: ['$startTripTime', 0, 2] }, // Estrai HH
                minute: { $substr: ['$startTripTime', 3, 2] }, // Estrai mm
                delay: 1,
            },
        },
        {
            // Calcola l'intervallo di mezz'ora
            $addFields: {
                halfHour: {
                    $concat: [
                        { $toString: '$hour' },
                        ':',
                        {
                            $cond: [
                                { $lt: ['$minute', '30'] }, // Se i minuti sono < 30
                                '00',                       // Usa 00
                                '30',                       // Altrimenti usa 30
                            ],
                        },
                    ],
                },
            },
        },
        {
            // Raggruppa per intervallo di mezz'ora
            $group: {
                _id: '$halfHour',
                averageDelay: { $avg: '$delay' },
            },
        },
        {
            // Ordina gli intervalli in ordine cronologico
            $sort: { _id: 1 },
        },
        {
            // Rinomina _id in startTripTime per chiarezza
            $project: {
                _id: 0,
                startTripTime: '$_id',
                averageDelay: 1,
            },
        },
    ];

    const result = await this.aggregate(pipeline);
    return result;
};


/**
 * @typedef TripAverageDelay
 */
const TripAverageDelay = mongoose.model('tripsAverageDelay', tripAverageDelaySchema, 'tripsAverageDelay');

module.exports = TripAverageDelay;
