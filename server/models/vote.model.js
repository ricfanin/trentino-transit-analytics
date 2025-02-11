const { Schema, model } = require('mongoose');

const voteSchema = new Schema(
    {
        post_id: { type: Schema.Types.ObjectId, ref: 'Post' },
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        voteType: { type: String, enum: ['upvote', 'downvote'] },
        isComment: { type: Boolean, default: false },
    },
    { timestamps: true },
)

module.exports = model('Votes', voteSchema);