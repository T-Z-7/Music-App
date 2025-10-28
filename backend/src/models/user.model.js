import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true,
    },
    clerkID : {
        type : String,
        require : true,
        uniqued : true,
    }
},{timestamps: true});// createAt,updateAt

export const User = mongoose.model("User",userSchema);