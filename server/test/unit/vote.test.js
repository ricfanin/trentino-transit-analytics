const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Vote = require('../../models/vote.model');

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

describe('Vote Model Test', () => {
    it('should create and save a vote successfully', async () => {
        const vote = new Vote({ post_id: new mongoose.Types.ObjectId(), user_id: new mongoose.Types.ObjectId(), voteType: 'upvote' });
        const savedVote = await vote.save();
        expect(savedVote._id).toBeDefined();
        expect(savedVote.voteType).toBe('upvote');
    });
});