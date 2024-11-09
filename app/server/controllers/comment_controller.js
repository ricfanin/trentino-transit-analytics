'use strict';
const Comment = require('../models/comment_schema');
const Post = require('../models/post_schema');

const createComment = async (req, res) => {
    try{
        const authorId = req.session.user._id;
        const {postId, content} = req.body;

        const newComment = new Comment({author_id: authorId, post_id: postId, content: content});
        const savedComment = await newComment.save();

        await Post.findByIdAndUpdate(postId, {$push : {comments: savedComment._id}}, {new:true});
        
        res.status(200).json(savedComment);
    } catch(error){
        res.status(400).json({ message: 'Errore nella creazione del commento', error: error.message });  
    }
};

const deleteComment = async (req, res) => {
    try{
        const {commentId} = req.body
        const deletedComment = await Comment.findByIdAndDelete(commentId)
        res.status(200).json(deletedComment);
    } catch(error){
        res.status(400).json({ message: 'Errore nella cancellazione del commento', error: error.message });
    }
}

module.exports = {
    createComment,
    deleteComment
};