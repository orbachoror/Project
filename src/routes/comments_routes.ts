import express from 'express';
const router=express.Router();
import commentsController from '../controllers/comments_controller';
import {authTestMiddleware} from '../controllers/auth_controller';


router.get("/",commentsController.getAll.bind(commentsController));

router.get("/:id",commentsController.getById.bind(commentsController));

router.post("/", authTestMiddleware,commentsController.createItem.bind(commentsController));


export default router;