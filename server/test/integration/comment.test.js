const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../app');
const setupTestDB = require('../utils/setupTestDB');
const { Comment, Post, User } = require('../../models');
const { userOne, insertUsers } = require('../fixtures/user.fixture');
const { postOne, insertPosts } = require('../fixtures/post.fixture');
const { commentOne, insertComments } = require('../fixtures/comment.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

describe('Comment routes', () => {
  describe('POST /api/v1/comments', () => {
    let newComment;

    beforeEach(() => {
      newComment = {
        content: 'This is a new comment',
        post_id: postOne._id,
        author_id: userOne._id,
      };
    });

    test('should return 201 and successfully create new comment if data is ok', async () => {
      await insertUsers([userOne]);
      await insertPosts([postOne]);

      const res = await request(app)
        .post('/api/v1/comments')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newComment)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        __v: expect.anything(),
        _id: expect.anything(),
        content: newComment.content,
        post_id: newComment.post_id.toHexString(),
        author_id: userOne._id.toHexString(),
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        upvote: 0,
        downvote: 0,
      });

      const dbComment = await Comment.findById(res.body._id);
      expect(dbComment).toBeDefined();
      expect(dbComment.content).toBe(newComment.content);
    });

    test('should return 400 error if content is missing', async () => {
      await insertUsers([userOne]);
      await insertPosts([postOne]);
      delete newComment.content;

      await request(app)
        .post('/api/v1/comments')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newComment)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /api/v1/comments/post', () => {
    test('should return 200 and all comments for a post', async () => {
      await insertUsers([userOne]);
      await insertPosts([postOne]);
      await insertComments([commentOne]);

      const res = await request(app)
        .get(`/api/v1/comments/post?post_id=${postOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual([
        {
          _id: commentOne._id.toHexString(),
          content: commentOne.content,
          post_id: commentOne.post_id.toHexString(),
          author: {
            _id: userOne._id.toHexString(),
            username: userOne.username,
          },
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
          upvote: commentOne.upvote,
          downvote: commentOne.downvote,
        },
      ]);
    });
  });

  describe('PATCH /api/v1/comments', () => {
    test('should return 200 and successfully update comment if data is ok', async () => {
      await insertUsers([userOne]);
      await insertPosts([postOne]);
      await insertComments([commentOne]);

      const updateBody = { content: 'Updated comment content' };

      const res = await request(app)
        .patch(`/api/v1/comments`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send({ id: commentOne._id, content: 'Updated comment content' })
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        __v: expect.anything(),
        _id: commentOne._id.toHexString(),
        content: updateBody.content,
        post_id: commentOne.post_id.toHexString(),
        author_id: commentOne.author_id.toHexString(),
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        upvote: commentOne.upvote,
        downvote: commentOne.downvote,
      });

      const dbComment = await Comment.findById(commentOne._id);
      expect(dbComment).toBeDefined();
      expect(dbComment.content).toBe(updateBody.content);
    });

  });

  describe('DELETE /api/v1/comments', () => {
    test('should return 200 and successfully delete comment if data is ok', async () => {
      await insertUsers([userOne]);
      await insertPosts([postOne]);
      await insertComments([commentOne]);

      const res = await request(app)
        .delete(`/api/v1/comments/${commentOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.NO_CONTENT);

      const dbComment = await Comment.findById(commentOne._id);
      expect(dbComment).toBeNull();
    });
  });
});