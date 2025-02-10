const mongoose = require('mongoose');
const { StopDelays } = require('../../models');

const setupTestDB = require('../utils/setupTestDB');

setupTestDB();

describe('StopDelays Model Tests', () => {

    it('should create a valid StopDelay document', async () => {
        const stopDelayData = {
            stopId: 1,
            stopSequence: 1,
            stopTime: '12:30:00',
            routeName: 'Route A',
            routeId: 100,
            direction: 0,
            tripId: 'T123',
            delay: 5,
        };

        const stopDelay = new StopDelays(stopDelayData);
        const savedStopDelay = await stopDelay.save();

        expect(savedStopDelay._id).toBeDefined();
        expect(savedStopDelay.stopId).toBe(stopDelayData.stopId);
        expect(savedStopDelay.stopTime).toBe(stopDelayData.stopTime);
        expect(savedStopDelay.routeName).toBe(stopDelayData.routeName);
        expect(savedStopDelay.routeId).toBe(stopDelayData.routeId);
        expect(savedStopDelay.direction).toBe(stopDelayData.direction);
        expect(savedStopDelay.tripId).toBe(stopDelayData.tripId);
        expect(savedStopDelay.delay).toBe(stopDelayData.delay);
    });

    it('should calculate the average delay grouped by stopId', async () => {
        const stopDelayData1 = {
            stopId: 2,
            stopSequence: 1,
            stopTime: '12:30:00',
            routeName: 'Route A',
            routeId: 100,
            direction: 0,
            tripId: 'T123',
            delay: 5,
        };
        const stopDelayData2 = {
            stopId: 1,
            stopSequence: 2,
            stopTime: '12:35:00',
            routeName: 'Route A',
            routeId: 100,
            direction: 0,
            tripId: 'T124',
            delay: 10,
        };

        // Mock dei dati nella collection stopNames
        const stopNameData = {
            stopId: 1,
            stopName: 'Baselga Del Bondone',
        };

        await mongoose.connection.db.collection('stopNames').insertOne(stopNameData); // Inserisci il mock di stopNames


        await StopDelays.create([stopDelayData1, stopDelayData2]);

        const result = await StopDelays.getAverageDelayGroupByStops(100, 0);

        expect(result).toHaveLength(1);
        expect(result[0].stopId).toBe(1);
    });

    it('should calculate average delay for all directions', async () => {
        const stopDelayData1 = {
            stopId: 2,
            stopSequence: 1,
            stopTime: '12:30:00',
            routeName: 'Route A',
            routeId: 100,
            direction: 0,
            tripId: 'T123',
            delay: 5,
        };
        const stopDelayData2 = {
            stopId: 1,
            stopSequence: 2,
            stopTime: '12:35:00',
            routeName: 'Route A',
            routeId: 100,
            direction: 0,
            tripId: 'T124',
            delay: 10,
        };

        // Mock dei dati nella collection stopNames
        const stopNameData = {
            stopId: 1,
            stopName: 'Baselga Del Bondone',
        };

        await mongoose.connection.db.collection('stopNames').insertOne(stopNameData); // Inserisci il mock di stopNames

        await StopDelays.create([stopDelayData1, stopDelayData2]);

        const result = await StopDelays.getAverageDelayGroupByStopsAllDirection(100);

        expect(result.andata).toHaveLength(2);
        expect(result.ritorno).toHaveLength(0);
        expect(result.andata[0].stopId).toBe(1);
    });
});