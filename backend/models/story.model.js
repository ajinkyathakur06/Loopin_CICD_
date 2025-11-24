import mongoose from "mongoose"
const storySchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        Reuired:true
    },
    mediaType:{
        type:String,
        enum:["image","video"],
        reuired:true
    },
    media:{
        type:String,
        required:true
    },
    viewer:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required : true
        }
    ],
    createdAt:
        {
            type:Date,
            default:Date.now(),
            expires:86400
        }
    
},{timeStamp:true})
const Story=mongoose.Model("Story","storyModel")
export default Story