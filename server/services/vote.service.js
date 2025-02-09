const httpStatus = require('http-status');
const { Vote } = require('../models');
const { Post, Comment } = require('../models');
const ApiError = require('../utils/ApiError');

const createVote = async (voteBody) => {
    const { user_id, post_id, voteType, isComment } = voteBody;
    const model = isComment ? Comment : Post; // Determina se aggiornare un commento o un post
    
    const existingVote = await Vote.findOne({ user_id, post_id });
    
    if (existingVote) {
        if (existingVote.voteType === voteType) {
            return await model.findById(post_id);
        }

        const updates = {
            upvote: voteType === 'upvote' ? 1 : -1,
            downvote: voteType === 'downvote' ? 1 : -1,
        };

        await model.findByIdAndUpdate(post_id, { $inc: updates }, { new: true });
        existingVote.voteType = voteType;
        await existingVote.save();

        return await model.findById(post_id);
    }

    await Vote.create(voteBody);
    const updates = {
        upvote: voteType === 'upvote' ? 1 : 0,
        downvote: voteType === 'downvote' ? 1 : 0,
    };

    return await model.findByIdAndUpdate(post_id, { $inc: updates }, { new: true });
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