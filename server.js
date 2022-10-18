import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import mongoConnect from "./DB/connect.js";
import router from "./routes/route.js";
import path from 'path';

dotenv.config();

const PORT = process.config.PORT || 5000;
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(path.join(process.cwd() + '/views')));

app.set('trust proxy', 1)
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true
}))
app.use(function(req,res,next){
    res.locals.session = req.session;
    //console.log(req.session);
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/', router);

const start = async () => {
    try{
        await mongoConnect(process.env.MONGO_URI);
        
        await app.listen(PORT);
        console.log(`App is listening on PORT ${PORT}`);
    }catch(err){
        console.log(err);
    }
}
export default start;