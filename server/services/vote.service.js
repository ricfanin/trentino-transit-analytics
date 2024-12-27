const httpStatus = require('http-status');
const { Vote } = require('../models');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

const createVote = async (voteBody) => {
    console.log(voteBody)
    const vote = await Vote.create(voteBody);
    if(voteBody.voteType == 'upvote'){
        const post = await Post.findByIdAndUpdate(voteBody.post_id, { $inc: { upvote: 1 } },{ new: true } )
    } else if (voteBody.voteType == 'downvote'){
        const post = await Post.findByIdAndUpdate(voteBody.post_id, { $inc: { downvote: 1 } },{ new: true } )
    }

    return vote;
}


const getVotesByUser = async (userId) => {
    const votes = await Vote.find({author_id: userId});
    return votes; 
} 

const deleteVoteById = async (voteBody) => {
    const vote = await Vote.findOneAndDelete({ post_id: voteBody.post_id, user_id: voteBody.user_id });
    if(!vote) {
        throw new ApiError(httpStatus.NOT_FOUND, "vote not found");
    }

    if(vote.voteType === 'upvote'){
        const post = await Post.findByIdAndUpdate(voteBody.post_id, { $inc: { upvote: -1 } },{ new: true } )
    } else if (vote.voteType === 'downvote') {
        const post = await Post.findByIdAndUpdate(voteBody.post_id, { $inc: { downvote: -1 } },{ new: true } )
    }
    return vote;
}

module.exports = {
    createVote,
    getVotesByUser,
    deleteVoteById
}