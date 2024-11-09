const {Schema, model} = require('mongoose');

const postSchema = new Schema(
    {
        author_id:{
            type: Schema.ObjectId,
            required: [true, 'author is required'],
        },
        title:{
            type: String,
            required: [true, 'title is required'],
        },
        content:{
            type:String,
            required: [true, 'content is required'],
        },
        tags: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Tag'
        }],
        comments:[{
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        }], 
        upvote:{
            type: Number,
            default: 0,
        },
        downvote:{
            type: Number,
            default: 0,
        }
    },
    {timestamps: true},
);

module.exports = model('posts', postSchema);