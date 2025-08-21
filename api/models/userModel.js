import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{type : String , required:true , unique:true},
    email:{type : String , required:true , unique:true},
    password:{type : String , required:true},
    avatar:{type:String , default:"https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg"}
}, {timestamps : true})

const User = mongoose.model('User' , userSchema)

export default User