const {Schema, model} = require('mongoose');

const voteSchema = new Schema(
    {
        postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        voteType: { type: String, enum: ['upvote', 'downvote'] },
    },
    { timestamps: true },
)

module.exports = model('votes', voteSchema);