const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../app');
const setupTestDB = require('../utils/setupTestDB');
const { Post, User } = require('../../models');
const { userOne, insertUsers } = require('../fixtures/user.fixture');
const { postOne, postTwo, insertPosts } = require('../fixtures/post.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');
const mongoose = require('mongoose');

setupTestDB();

describe('Post routes', () => {
  describe('POST /api/v1/posts', () => {
    let newPost;

    beforeEach(() => {
      newPost = {
        author_id: userOne._id,
        title: 'New Post',
        content: 'Content of the new post',
      };
    });

    test('should return 201 and successfully create new post if data is ok', async () => {
      await insertUsers([userOne]);

      const res = await request(app)
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newPost)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        __v: expect.anything(),
        _id: expect.anything(),
        title: newPost.title,
        content: newPost.content,
        author_id: userOne._id.toHexString(),
        createdAt: expect.anything(),
        downvote: 0,
        upvote: 0,
        tags: [],
        updatedAt: expect.anything(),
        comments: [],
      });

      const dbPost = await Post.findById(res.body._id);
      expect(dbPost).toBeDefined();
      expect(dbPost.title).toBe(newPost.title);
    });

    test('should return 400 error if title is missing', async () => {
      await insertUsers([userOne]);
      delete newPost.title;

      await request(app)
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newPost)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /api/v1/posts', () => {
    test('should return 200 and the post object if data is ok', async () => {
      await insertUsers([userOne]);
      await insertPosts([postOne]);

      const res = await request(app)
        .get(`/api/v1/posts?post_id=${postOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        __v: expect.anything(),
        _id: postOne._id.toHexString(),
        title: postOne.title,
        content: postOne.content,
        author_id: {
            _id: postOne.author_id.toHexString(),
            username: userOne.username,
        },
        downvote: 0,
        upvote: 0,
        tags: [],
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        comments: [],
      });
    });

    test('should return 404 if post is not found', async () => {
      await insertUsers([userOne]);

      await request(app)
        .get(`/api/v1/posts?post_id=${new mongoose.Types.ObjectId()}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('PATCH /api/v1/posts', () => {
    test('should return 200 and successfully update post if data is ok', async () => {
      await insertUsers([userOne]);
      await insertPosts([postOne]);

      const updateBody = { title: 'Updated Post Title' };

      const res = await request(app)
        .patch(`/api/v1/posts`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send({ id: postOne._id, bodyPost: updateBody })
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        __v: expect.anything(),
        _id: postOne._id.toHexString(),
        title: updateBody.title,
        content: postOne.content,
        author_id: postOne.author_id.toHexString(),
        downvote: 0,
        upvote: 0,
        tags: [],
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
        comments: [],
      });

      const dbPost = await Post.findById(postOne._id);
      expect(dbPost).toBeDefined();
      expect(dbPost.title).toBe(updateBody.title);
    });

    test('should return 404 if post is not found', async () => {
      await insertUsers([userOne]);

      const updateBody = { title: 'Updated Post Title' };

      await request(app)
        .patch(`/api/v1/posts`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send({ id: new mongoose.Types.ObjectId(), bodyPost: updateBody })
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /api/v1/posts', () => {
    test('should return 200 and successfully delete post if data is ok', async () => {
      await insertUsers([userOne]);
      await insertPosts([postOne]);

      const res = await request(app)
        .delete(`/api/v1/posts/${postOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(httpStatus.NO_CONTENT);

      const dbPost = await Post.findById(postOne._id);
      expect(dbPost).toBeNull();
    });

    test('should return 404 if post is not found', async () => {
      await insertUsers([userOne]);

      await request(app)
        .delete(`/api/v1/posts`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send({ postId: new mongoose.Types.ObjectId() })
        .expect(httpStatus.NOT_FOUND);
    });
  });
});