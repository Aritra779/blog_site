import { BlogModel, CommentModel } from "../models/index.js";

const createBlogView = (req, res) => {
    res.render('createBlog.pug', {Title  :"New Blog"});
}

const createBlog = async (req, res) => {
    const authorId = req.params.user_id;
    const {title, content} = req.body;
    try{
        const newBlog = await BlogModel.create({
            title : title,
            content : content,
            authorId : authorId
        });
        res.redirect(`/blog/${newBlog.id}`);
    }catch(err){
        res.render('createBlog.pug', {blog : newBlog, msg : 'Something went wrong while creating the blog. Try again.'});
    }
    
};

const viewBlog = async (req, res) => {
    try{
        const blog = await BlogModel
            .findById(req.params.blog_id)
            .populate('authorId')
            .populate({
                path : 'comments',
                populate : {
                    path : 'authorId',
                    model : 'user'
                } 
            });
        res.render('blog.pug', {blog : blog});
    }catch(err){
        const blogs = await BlogModel.find();
        res.redirect('/feed');
    }
    
}

const editBlogView = async (req, res) => {
    try{
        const blog = await BlogModel.findById(req.params.blog_id);
        //console.log(blog)
        res.render('editBlog.pug', {blog : blog});
    }catch(err){ 
        res.redirect('/feed');
    }
}

const editBlog = async (req, res) => {
    const {blog_id} = req.params;
    //console.log(req.body)
    const {title, content} = req.body;
    let blog = await BlogModel.findById(blog_id);
    try{
        blog.title = title;
        blog.content = content;
        //console.log(blog);
        await blog.save();
        //console.log(blog);
        res.status(200).json({msg : 'Editted'})
    }catch(err){
        res.render('editBlog.pug', {blog : blog});
    }
    
}

const deleteBlog = async (req, res) => {
    try{
        const blogToBeDeleted = await BlogModel.findByIdAndDelete(req.params.blog_id);
        res.status(200).json({msg: 'successfully deleted'})
    }catch(err){
        res.status(400).json({msg : 'something went wrong'});
    }
    
}


export {
    createBlogView,
    createBlog,
    viewBlog,
    editBlogView,
    editBlog,
    deleteBlog
};