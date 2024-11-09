'use strict';

const Tag = require('../models/tag_schema');

const createTag = async (req, res) => {
    try{
        const {name} = req.body;
        const newTag = new Tag({name: name});
        const savedTag = await newTag.save();
        res.status(200).json(savedTag);
    } catch(error){
        if (error.code === 11000) { // Codice di errore per duplicato in MongoDB
            res.status(400).json({ message: 'Email già in uso' });
        } else {
        res.status(400).json({ message: 'Errore nella creazione del tag', error: error.message });
        }
    }
};

const deleteTag = async (req, res) => {
    try{
        const {tag_id} = req.body
        const deletedTag = await Tag.findByIdAndDelete(tag_id)
        res.status(200).json(deletedTag);
    } catch(error){
        if (error.code === 11000) { // Codice di errore per duplicato in MongoDB
            res.status(400).json({ message: 'Email già in uso' });
        } else {
            res.status(400).json({ message: 'Errore nella cancellazione del tag', error: error.message });
        }
    }
}

module.exports = {
    createTag,
    deleteTag
};