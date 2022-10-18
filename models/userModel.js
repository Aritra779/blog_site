import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    name : {
        type: String,
        require : [true, 'name must not be blank']
    },
    address : String,
    email : {
        type : String,
        required : [true, 'email must be provided.'],
        unique : [true, 'mustn\'t have duplicate email']
    },
    password : {
        type : String,
        required : [true, 'must have a password.']
    }
},{timestamps: true});


UserSchema.pre('save', function(){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
})

const UserModel = new model('user',UserSchema);

export default UserModel;