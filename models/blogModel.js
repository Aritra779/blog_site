import { Schema, model, Types } from "mongoose";

const CommentSchema = new Schema({
    authorId : {
        type : Types.ObjectId,
        required : [true, 'every comment must be written by someone.']
    },
    content : {
        type : String,
        required : [true, 'comment must contain something.']
    },
    associatedBlogId : {
        type : Types.ObjectId,
        required : [true, 'must be associated with a blog.']
    }
},{timestamps: true});

const BlogSchema = new Schema({
    title : {
        type : String,
        required : [true, 'title mustn\'t be vacant']
    },
    content : {
        type : String,
        required : [true, 'must have some content']
    },
    authorId : {
        type : Types.ObjectId,
        ref : 'user',
        required : [true, 'every blog must have an author']
    },
    comments : {
        type : [CommentSchema]
    }
},{timestamps: true});

const CommentModel = new model('comments', CommentSchema);
const BlogModel = new model('blog', BlogSchema);

export { 
    BlogModel,
    CommentModel
};