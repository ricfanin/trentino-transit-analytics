const mongoose = require('mongoose');
const { Comment } = require('../../models');

const setupTestDB = require('../utils/setupTestDB');

setupTestDB();

describe('Comment Model Test', () => {
    it('should create and save a comment successfully', async () => {
        const comment = new Comment({ author_id: new mongoose.Types.ObjectId(), post_id: new mongoose.Types.ObjectId(), content: 'Nice post!' });
        const savedComment = await comment.save();
        expect(savedComment._id).toBeDefined();
        expect(savedComment.content).toBe('Nice post!');
    });
});