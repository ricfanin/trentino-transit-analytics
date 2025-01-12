const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { voteService } = require('../services');

const createVote = catchAsync(async (req, res) => {
    const vote = await voteService.createVote(req.body);
    console.log(vote);
    res.status(httpStatus.CREATED).send(vote);
});

const getVotesByUser = catchAsync(async (req, res) => {
    const votes = await voteService.getVotesByUser(req.body.id);
    res.status(httpStatus.OK).send(votes);
});

const deleteVote = catchAsync(async (req, res) => {
    const vote = await voteService.deleteVoteById(req.body);
    res.status(httpStatus.NO_CONTENT).send(vote);
});

module.exports = {
    createVote,
    getVotesByUser,
    deleteVote
}