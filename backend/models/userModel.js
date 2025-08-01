import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:true});
    
   

const User=mongoose.model('User',userSchema);

export default User;
