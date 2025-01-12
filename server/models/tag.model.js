const { Schema, model } = require('mongoose');

const tagSchema = new Schema(
    {
        name: {
            type: String,
            unique: true
        },
        color: {
            type: String,
            required: true,  // Rende il colore obbligatorio per ogni tag
            match: /^#([0-9A-F]{3}){1,2}$/i,  // Validazione per assicurarsi che il colore sia un valore esadecimale valido (opzionale)
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