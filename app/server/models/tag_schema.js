const {Schema, model} = require('mongoose');

const tagSchema = new Schema(
    {
        name: { 
            type: String, 
            unique: true 
        },
        posts: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Post' 
        }]
    },
    { timestamps: true },
);

module.exports = model('tags', tagSchema);