import Loop from "../models/loop.model.js";
import User from "../models/user.model.js";
import uploadOnCloudinary from '../config/cloudinary.js'



export const uploadLoop = async (req, res) => {
  try {
    const { caption } = req.body;
    let media;
    if (req.file) {
        // Upload to cloudinary
      media = await uploadOnCloudinary(req.file.path);
    } else {
      return res.status(400).json({ message: "media is required" });
    }
        // Create new loop
    const loop = await Loop.create({
      caption,
      media,
      author: req.userId,
    });
        // Link loop to user
    const user = await User.findById(req.userId);
    user.loops.push(loop._id);
    await user.save();
    // Populate author before sending response
    const populatedLoop = await Loop.findById(loop._id).populate(
      "author",
      "name userName profileImage"
    );

    return res.status(201).json(populatedLoop);
  } catch (error) {
     console.error("uploadLoop error:", error);
    return res.status(500).json({ message: `UploadLoop error ${error}` });
  }
};
// ---------------------- Like Loop ----------------------
export const like=async(req,res)=>{
    try{
        const loopId=req.params.loopId
        const loop=await Loop.findById(loopId)
        if(!loop){
           return res.status(404).json({ message: "loop not found" });
        }

        const alreadyLiked=loop.likes.some(id=>id.toString()
    === req.userId.toString())
    if(alreadyLiked){
        loop.likes = loop.likes.filter(
          (id) => id.toString() !== req.userId.toString());
    }else{
        loop.likes.push(req.userId)
    }
    await loop.save()
     // Always populate before sending the response
    await loop.populate("author", "name userName profileImage");
    io.emit("LikedLoop",{
      loopId:loop._id,
      likes:loop.likes
    })
     return res.status(200).json(loop);
    } catch(error){
       console.error("likeLoop error:", error);
        return res.status(500).json({ message: `likeloop error ${error}` });
    }
}

// ---------------------- Comment on Loop ----------------------
export const comment=async(req,res)=>{
    try{
const{message}=req.body
const loopId=req.params.loopId
const loop=await Loop.findById(loopId)
if(!loop){
    return res.status(404).json({message:"Loop not found"})
}
loop.comments.push({
    author:req.userId,
    message
})
await loop.save()
 // Proper population for author and comment authors
await loop.populate("author", "name userName profileImage"),
await loop.populate("comments.author");
 io.emit("CommentedOnLoop",{
      loopId:loop._id,
      comments:loop.comments
    })
return res.status(200).json(loop);
    }catch(error){
       console.error("comment error:", error);
        return res.status(500).json({ message: `comment post error ${error}` });
    }
}
// ---------------------- Get All Loops ----------------------
export const getAllLoops=async(req,res)=>{
    try{
        const loops = await Loop.find({}).populate(
          "author", "name userName profileImage")
          .populate("comments.author")
            return res.status(200).json(loops)
    } catch(error){
       console.error("getAllLoops error:", error);
        return res.status(500).json({message:`getallloop error ${error}`})
    }
}

