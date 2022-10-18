import { Router } from "express";
import isAuthenticated from "../Auth/auth.js";
import { 
    signupView,
    loginView,
    signup, 
    login,
    logout,
    getFeed, 
    viewProfile, 
    editProfile, 
    editProfileView, 
    viewBlog, 
    createBlog, 
    createBlogView, 
    deleteBlog,
    editBlog,
    editBlogView,
    createComment, 
    editCommentView,
    editComment, 
    deleteComment 
} from "../controllers/index.js";


const router = Router();

router.get('/', getFeed);
router.get('/feed', (req, res) => {res.redirect('/')});
router.get('/login', loginView);
router.get('/signup', signupView);
router.post('/auth/login', login);
router.get('/auth/logout',isAuthenticated, logout)
router.post('/auth/signup', signup);
router.get('/user/:user_id',isAuthenticated, viewProfile);
router.route('/user/edit/:user_id').get(isAuthenticated, editProfileView).post(isAuthenticated, editProfile);
router.route('/blog/new').get(isAuthenticated, createBlogView).post(isAuthenticated, createBlog);
router.route('/blog/:blog_id/comment/:comment_id').get(isAuthenticated, editCommentView).patch(isAuthenticated, editComment).delete(isAuthenticated, deleteComment);
router.route('/blog/:blog_id/comment').post(isAuthenticated, createComment);
router.route('/blog/:blog_id/edit').get(isAuthenticated ,editBlogView).patch(isAuthenticated, editBlog);
router.route('/blog/:blog_id').get(viewBlog).delete(isAuthenticated, deleteBlog);

export default router;