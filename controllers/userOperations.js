import { BlogModel, CommentModel, UserModel } from "../models/index.js";
import bcrypt from 'bcryptjs';
import session from "express-session";

const signupView = async ( req, res ) => {
    res.render('signup.pug', {title : 'SignUp'})
}

const signup = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const newUser = await UserModel.create({
            name : name,
            password : password,
            email : email
        })
        req.session.regenerate(function(err){
            if(err) next(err)
            req.session.user = newUser.id;
            req.session.save(function(err){
                if(err) next(err)
                console.log(req.session)
                res.redirect('/feed')
            })
        });
    }catch(err){
        res.render('signup.pug', {msg : `${email} already exists. use a new Id`})
    }
    
};

const loginView = async (req, res) => {
    res.render('login.pug', {title : "Login"});
};

const isValidPassword = (hash, password) => {
    return (bcrypt.compareSync(password, hash));
}

const login = async (req, res, next) => {
    const {username, password}  = req.body;
    const user = await UserModel.findOne({email : username});
    if(user === null){
        res.render('login.pug', {title : "Login", msg : `no user found with the email : ${username}`});
    }
    else if(!isValidPassword(user.password, password)){
        res.render('login.pug', {title : "Login",msg : `Wrong password for the username : ${username}`})
    }else{
        req.session.regenerate(function(err){
            if(err) next(err)
            req.session.user = user.id;
            req.session.save(function(err){
                if(err) next(err)
                res.redirect('/feed')
            })
        });
    }
};

const logout = async (req, res, next) => {
    req.session.user = null;
    await req.session.save(function(err){
        if(err) next(err)
        req.session.regenerate(function(err){
            if(err) next(err);
            res.redirect('/feed');
        });
    });
    
    
}

const viewProfile = async (req, res) => {
    const userId = req.params.user_id;
    const user = await UserModel.findById(userId);
    const posts = await BlogModel.find({authorId : userId});
    const comments = await CommentModel.find({authorId : userId});
    res.render("profile.pug", { title: "Profile", profile : {user : user, posts : posts, comments : comments} });
}

const editProfileView = async (req, res) => {
    const userId = req.params.user_id;
    const user = UserModel.findById(userId);
    if(user === null){
        res.render('/', {msg : 'something went wrong. Try again.'})
    }
    res.render('editProfile', { user : user });
}

const editProfile = async (req, res) =>{
    const { name, address, email} = req.body;
    const user = UserModel.findById(req.params.user_id);
    if(user === null){
        res.render('/feed', {msg : 'something went wrong while trying to find the user. Please try again.'});
    }
    user.name = name || user.name;
    user.address = address || user.address;
    user.email = email || user.email;
    await user.save();
    res.render('profile', {user : user});
}

export {
    signupView,
    signup,
    loginView,
    login,
    logout,
    viewProfile,
    editProfileView,
    editProfile
}