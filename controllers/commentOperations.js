import mongoose from "mongoose";
import { BlogModel, CommentModel } from "../models/index.js";

const createComment = async (req, res) => {
    let {blog_id, user_id} = req.params;
    const {comment} = req.body;
    user_id = '6349209cab0d926b049729be';
    try{
        const newComment = await CommentModel.create({
            content : comment,
            authorId : mongoose.Types.ObjectId(user_id),
            associatedBlogId : mongoose.Types.ObjectId(blog_id)
        });
        const blog = await BlogModel.findById(blog_id);
        blog.comments.push(newComment);
        await blog.save();
        res.render('blog.pug', {blog : blog});
    }catch(err){
        const blog = await BlogModel.findById(blog_id);
        res.render('blog.pug', {blog : blog});
    }
    
}

const editCommentView = async (req, res) => {
    const { comment_id } = req.params;
    const comment = await CommentModel.findById(comment_id);
    res.render('editComment.pug', {comment : comment});
}

const editComment = async (req, res) => {
    const { blog_id, comment_id } = req.params;
    const  { comment } = req.body;
    const commentToBeUpdated = await CommentModel.findById(comment_id);
    const associatedBlog = await BlogModel.findById(blog_id);
    commentToBeUpdated.content = comment;
    const oldComment = associatedBlog.comments.id(comment_id);
    oldComment.content = comment;
    await associatedBlog.save();
    await commentToBeUpdated.save();
    res.status(200).json({msg : 'Edited'});
}

const viewAllComments = async (req, res) => {
    const contentId = req.params.blog_id;
    const comments = await BlogModel.findById(contentId).filter('comments');
    res.status(200).json(comments);
}

const deleteComment = async (req, res) => {
    const { blog_id, comment_id } = req.params;
    await CommentModel.findByIdAndDelete(comment_id);
    const associatedBlog = await BlogModel.findById(blog_id);
    await associatedBlog.comments.id(comment_id).remove();
    await associatedBlog.save();
    res.status(200).json({msg : "Deleted"})
}

export {
    createComment,
    editCommentView,
    editComment,
    viewAllComments,
    deleteComment
}