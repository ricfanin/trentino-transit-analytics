const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        author_id:
        {
            type: Schema.ObjectId,
            required: [true, 'author is required'],
        },
        post_id:
        {
            type: Schema.ObjectId,
            required: [true, 'post_id is required'],
        },
        content: {
            type: String,
            required: [true, 'content is required'],
        },
        upvote: {
            type: Number,
            default: 0,
        },
        downvote: {
            type: Number,
            default: 0,
        }
    },
    { timestamps: true },
)

module.exports = model('comments', commentSchema);