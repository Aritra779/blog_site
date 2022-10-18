import mongoose, {connect} from "mongoose";
import { UserModel } from "../models/index.js";

const mongoConnect = async (url) => {
    try{
        await mongoose.connect(url,{dbName : 'Hitwicket'});
        console.log('Successfully connected to the Database. :)');
    }catch(err){
        //error handlers to be set later
        console.log(err);
    }
}


export default mongoConnect;