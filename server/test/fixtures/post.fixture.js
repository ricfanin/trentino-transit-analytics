const mongoose = require('mongoose');
const { Post } = require('../../models');
const { userOne } = require('./user.fixture');

const postOne = {
  _id: new mongoose.Types.ObjectId(),
  title: 'First Post',
  content: 'Content of the first post',
  author_id: userOne._id,
  comments: [],
};

const postTwo = {
  _id: new mongoose.Types.ObjectId(),
  title: 'Second Post',
  content: 'Content of the second post',
  author_id: userOne._id,
  comments: [],
};

const insertPosts = async (posts) => {
  await Post.insertMany(posts);
};

module.exports = {
  postOne,
  postTwo,
  insertPosts,
};