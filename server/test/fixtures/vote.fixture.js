const mongoose = require('mongoose');
const { Vote } = require('../../models');
const { postOne } = require('./post.fixture');
const { userOne } = require('./user.fixture');

const voteOne = {
  _id: new mongoose.Types.ObjectId(),
  user_id: userOne._id,
  post_id: postOne._id,
  voteType: 'upvote',
};

const voteTwo = {
  _id: new mongoose.Types.ObjectId(),
  user_id: userOne._id,
  post_id: postOne._id,
  voteType: 'downvote',
};

const insertVotes = async (votes) => {
  await Vote.insertMany(votes);
};

module.exports = {
  voteOne,
  voteTwo,
  insertVotes,
};