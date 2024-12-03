import express, { Request, Response } from 'express';
const router=express.Router();
import commentsController from '../controllers/comments_controller';

router.get("/",commentsController.getAllComments);

router.get("/:id",commentsController.getCommentsById);

router.post("/", commentsController.createComment);

router.delete("/:id",(req:Request,res:Response)=>{
     commentsController.deleteComment(req,res);
});

export default router;