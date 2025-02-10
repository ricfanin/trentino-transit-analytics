const mongoose = require('mongoose');
const { TripsAverageDelay } = require('../../models');

const setupTestDB = require('../utils/setupTestDB');

setupTestDB();

describe('TripAverageDelay Model Tests', () => {

    it('should create a valid TripAverageDelay document', async () => {
        const tripAverageDelayData = {
            routeName: 'Route A',
            routeId: 100,
            direction: 0,
            date: new Date(),
            tripId: 'T123',
            startTripTime: '12:30:00',
            endTripTime: '12:45:00',
            delay: 5,
        };

        const tripAverageDelay = new TripsAverageDelay(tripAverageDelayData);
        const savedTripAverageDelay = await tripAverageDelay.save();

        expect(savedTripAverageDelay._id).toBeDefined();
        expect(savedTripAverageDelay.routeName).toBe(tripAverageDelayData.routeName);
        expect(savedTripAverageDelay.routeId).toBe(tripAverageDelayData.routeId);
        expect(savedTripAverageDelay.direction).toBe(tripAverageDelayData.direction);
        expect(savedTripAverageDelay.date).toBe(tripAverageDelayData.date);
        expect(savedTripAverageDelay.tripId).toBe(tripAverageDelayData.tripId);
        expect(savedTripAverageDelay.startTripTime).toBe(tripAverageDelayData.startTripTime);
        expect(savedTripAverageDelay.endTripTime).toBe(tripAverageDelayData.endTripTime);
        expect(savedTripAverageDelay.delay).toBe(tripAverageDelayData.delay);
    });

    it('should calculate average delay grouped by routeId (getAverageDelayGroupByLinea)', async () => {
        const tripAverageDelayData1 = {
            routeName: 'Route A',
            routeId: 100,
            direction: 0,
            date: new Date(),
            tripId: 'T123',
            startTripTime: '12:30:00',
            endTripTime: '12:45:00',
            delay: 5,
        };
        const tripAverageDelayData2 = {
            routeName: 'Route A',
            routeId: 100,
            direction: 0,
            date: new Date(),
            tripId: 'T124',
            startTripTime: '12:40:00',
            endTripTime: '12:55:00',
            delay: 10,
        };

        const routeDetailsData = {
            routeId: 100,
            routeNumber: 'A100',
        };

        // Inserisci i dati mock per routeIdRouteNumber
        await mongoose.connection.db.collection('routeIdRouteNumber').insertOne(routeDetailsData);
        await TripsAverageDelay.create([tripAverageDelayData1, tripAverageDelayData2]);

        const result = await TripsAverageDelay.getAverageDelayGroupByLinea();

        expect(result).toHaveLength(1);
        expect(result[0].routeNumber).toBe(routeDetailsData.routeNumber);
    });

    it('should calculate average delay grouped by startTripTime (half-hour intervals)', async () => {
        const tripAverageDelayData1 = {
            routeName: 'Route A',
            routeId: 100,
            direction: 0,
            date: new Date(),
            tripId: 'T123',
            startTripTime: '12:00:00',
            endTripTime: '12:00:00',
            delay: 5,
        };
        const tripAverageDelayData2 = {
            routeName: 'Route A',
            routeId: 100,
            direction: 0,
            date: new Date(),
            tripId: 'T124',
            startTripTime: '12:30:00',
            endTripTime: '12:30:00',
            delay: 10,
        };

        await TripsAverageDelay.create([tripAverageDelayData1, tripAverageDelayData2]);

        const result = await TripsAverageDelay.getAverageDelayGroupByStartTrip(100);

        expect(result).toHaveLength(2);
        expect(result[0].startTripTime).toBe('12:00'); // Primo intervallo
        expect(result[0].averageDelay).toBe(5);
        expect(result[1].startTripTime).toBe('12:30'); // Secondo intervallo
    });
});