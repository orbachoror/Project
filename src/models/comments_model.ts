import mongoose from "mongoose";
const commentSchema =new mongoose.Schema({
    comment: {
        type:String,
        require: true,
    },
    owner:{
        type: String,
        require:true,
    },
    postId:{
        type: String,
        require:true,
    },
});

const commentModel =mongoose.model("Comments",commentSchema);
export default commentModel;