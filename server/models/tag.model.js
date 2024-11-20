const { Schema, model } = require('mongoose');

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

tagSchema.statics.tagExists = async function (tagName) {
    const tag = await this.findOne({ name: tagName });
    return !!tag;
};

module.exports = model('Tag', tagSchema);