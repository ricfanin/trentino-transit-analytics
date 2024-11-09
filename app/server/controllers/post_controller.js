'use strict';

const Post = require('../models/post_schema');
const Tag = require('../models/tag_schema');

const createPost = async (req, res) => {
    try{
        const authorId = req.session.user._id;
        const {title, content, tags} = req.body;

        //add tags to post
        const tagsId = [];
        for(var i = 0; i < tags.length; i++){
            const tag = await Tag.findOne({name:tags[i].name}) 
            if(tag == undefined){
                return res.status(400).json({messagge: 'Tag non esistente'})
            }
            else
            {
                tagsId.push(tag._id);
            }
        }

        const newPost = new Post({author_id: authorId, title: title, content: content, tags: tagsId});
        const savedPost = await newPost.save();

        //add post to tags
        for(var i = 0; i < tagsId.length; i++){
            const tag = await Tag.findByIdAndUpdate(tagsId[i], { $push: {posts: savedPost._id}}, {new: true}) 
        }

        res.status(200).json(savedPost);
    } catch (error){
        res.status(400).json({ message: 'Errore nella creazione del post', error: error.message });
    }
}

const deletePost = async (req, res) => {
    try{
        const {post_id} = req.body;
        const post = await Post.findById(post_id);

        if (!post) {
            return res.status(404).json({ message: 'Post non trovato' });
        }

        if(post.author_id.toString() != req.session.user._id.toString()){
            return res.status(400).json({message: 'author non coincide'});
        }

        await Post.findByIdAndDelete(post_id);
        res.status(200).json(post);

    } catch (error) {
        res.status(400).json({ message: 'Errore nella cancellazione del post', error: error.message });
    }
}

module.exports = {
    createPost,
    deletePost
};