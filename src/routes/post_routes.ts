import express, {Request,Response} from 'express';
const router=express.Router();
import postsController from '../controllers/posts_controller';

router.get("/",postsController.getAllPosts);

router.get("/:id",postsController.getPostById);

router.post("/", postsController.createPost);

// router.delete("/:id", postsController.deletePost);

router.delete("/:id",(req:Request,res:Response)=>{
    postsController.deletePost(req,res);
});

export default router;