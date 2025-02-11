const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../app');
const setupTestDB = require('../utils/setupTestDB');
const { Vote, User, Post } = require('../../models');
const { userOne, insertUsers } = require('../fixtures/user.fixture');
const { postOne, insertPosts } = require('../fixtures/post.fixture');
const { voteOne, insertVotes } = require('../fixtures/vote.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');
const mongoose = require('mongoose');

setupTestDB();

describe('Vote routes', () => {
  describe('POST /api/v1/votes', () => {
    let newVote;

    beforeEach(() => {
      newVote = {
        user_id: userOne._id,
        post_id: postOne._id,
        voteType: 'upvote',
        isComment: false,
      };
    });

    test('should return 201 and successfully create new vote if data is ok', async () => {
      await insertUsers([userOne]);
      await insertPosts([postOne]);

      const res = await request(app)
        .post('/api/v1/votes')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newVote)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        __v: expect.anything(),
        _id: expect.anything(),
        title: postOne.title,
        content: postOne.content,
        author_id: userOne._id.toHexString(),
        createdAt: expect.anything(),
        downvote: 0,
        upvote: 1,
        tags: [],
        updatedAt: expect.anything(),
        comments: [],
      });

      const dbVote = await Vote.findById(res.body._id);
      expect(dbVote).toBeDefined();
    });

    test('should return 400 error if voteType is missing', async () => {
      await insertUsers([userOne]);
      await insertPosts([postOne]);
      delete newVote.voteType;

      await request(app)
        .post('/api/v1/votes')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newVote)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /api/v1/votes', () => {
    test('should return 200 and all votes for a user', async () => {
      await insertUsers([userOne]);
      await insertPosts([postOne]);
      await insertVotes([voteOne]);

      const res = await request(app)
        .get(`/api/v1/votes?id=${userOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual([
        {
          __v: expect.anything(),
          _id: voteOne._id.toHexString(),
          user_id: voteOne.user_id.toHexString(),
          post_id: voteOne.post_id.toHexString(),
          isComment: voteOne.isComment,
          voteType: voteOne.voteType,
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        },
      ]);
    });
  });
});