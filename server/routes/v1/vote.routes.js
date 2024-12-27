const express = require('express');
const validate = require('../../middlewares/validate')
const voteController = require('../../controllers/vote.controller');
const voteValidation = require('../../validations/vote.validation');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
    .route('/')
    .post(auth(), validate(voteValidation.createVote), voteController.createVote)
    .delete(auth(), validate(voteValidation.deleteVote), voteController.deleteVote)
    .get(auth(), validate(voteValidation.getVotesByUser), voteController.getVotesByUser);


module.exports = router;