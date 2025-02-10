const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Post } = require('../../models');
const { User } = require('../../models');

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

describe('Post Model Test', () => {

    it('should create and save a post successfully', async () => {
        const user = new User({ username: 'testuser', email: 'test@example.com', password: 'Test1234', name: 'Test', surname: 'User' });
        await user.save();

        const post = new Post({
            author_id: user._id,
            title: 'Test Post',
            content: 'This is a test post',
        });
        const savedPost = await post.save();
        expect(savedPost._id).toBeDefined();
        expect(savedPost.title).toBe('Test Post');
    });
});
