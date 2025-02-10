const { routeIdRouteNumber } = require('../../models');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('RouteIdRouteNumber Model Test', () => {
    beforeEach(async () => {
        await routeIdRouteNumber.deleteMany();
    });

    test('Should create and save a routeIdRouteNumber successfully', async () => {
        const validRecord = new routeIdRouteNumber({ routeId: 1, routeNumber: 100, color: "#FF5733" });
        const savedRecord = await validRecord.save();

        expect(savedRecord._id).toBeDefined();
        expect(savedRecord.routeId).toBe(1);
        expect(savedRecord.routeNumber).toBe(100);
        expect(savedRecord.color).toBe("#FF5733");
    });

    test('Should fail if required fields are missing', async () => {
        const invalidRecord = new routeIdRouteNumber({});
        let err;
        try {
            await invalidRecord.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeDefined();
        expect(err.errors.routeId).toBeDefined();
        expect(err.errors.routeNumber).toBeDefined();
        expect(err.errors.color).toBeDefined();
    });

    test('Should retrieve all records', async () => {
        await routeIdRouteNumber.insertMany([
            { routeId: 1, routeNumber: 100, color: "#FF5733" },
            { routeId: 2, routeNumber: 200, color: "#33FF57" }
        ]);
        const records = await routeIdRouteNumber.getAllRecords();

        expect(records.length).toBe(2);
        expect(records[0].routeNumber).toBe(100);
        expect(records[1].routeNumber).toBe(200);
    });

    test('Should retrieve a record by ID', async () => {
        const record = new routeIdRouteNumber({ routeId: 1, routeNumber: 100, color: "#FF5733" });
        const savedRecord = await record.save();
        const foundRecord = await routeIdRouteNumber.getRecordById(savedRecord._id);

        expect(foundRecord).toBeDefined();
        expect(foundRecord.routeId).toBe(1);
        expect(foundRecord.routeNumber).toBe(100);
        expect(foundRecord.color).toBe("#FF5733");
    });
});
