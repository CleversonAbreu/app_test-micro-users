import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String}
},{timestamps:true,collection:'users'})