const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { Tag } = require('../../models');

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

describe('Tag Model Test', () => {
    it('should create and save a tag successfully', async () => {
        const tag = new Tag({ name: 'JavaScript', color: '#f7df1e' });
        const savedTag = await tag.save();
        expect(savedTag._id).toBeDefined();
        expect(savedTag.name).toBe('JavaScript');
    });
});