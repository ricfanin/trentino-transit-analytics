const mongoose = require('mongoose');
const { Comment } = require('../../models');
const { postOne } = require('./post.fixture'); 
const { userOne } = require('./user.fixture');

const commentOne = {
  _id: new mongoose.Types.ObjectId(),
  content: 'This is the first comment',
  post_id: postOne._id,
  author_id: userOne._id,
  upvote: 0,
  downvote: 0,
};

const commentTwo = {
  _id: new mongoose.Types.ObjectId(),
  content: 'This is the second comment',
  post_id: postOne._id,
  author_id: userOne._id,
  upvote: 0,
  downvote: 0,
};

const insertComments = async (comments) => {
  await Comment.insertMany(comments);
};

module.exports = {
  commentOne,
  commentTwo,
  insertComments,
};