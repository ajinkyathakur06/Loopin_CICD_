import mongoose from "mongoose"
const loopSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.types.ObjectId,
      ref: "User",
      reuired: true,
    },
    
    media: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.Object.Id,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const Loop=mongoose.Model("Loop",loopSchema)
export default Loop