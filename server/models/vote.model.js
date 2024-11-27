const { Schema, model } = require('mongoose');

const voteSchema = new Schema(
    {
        postId: { type: Schema.Types.ObjectId, ref: 'Post' },
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        voteType: { type: String, enum: ['upvote', 'downvote'] },
    },
    { timestamps: true },
)

module.exports = model('Votes', voteSchema);