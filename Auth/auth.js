import session from "express-session"

const isAuthenticated = (req, res, next) => {
    //console.log(req.session);
    if(req.session.user){
        req.params.user_id = req.params.user_id || req.session.user;
        next();
    }
    else{
        res.redirect('/login');
    }
}

export default isAuthenticated;