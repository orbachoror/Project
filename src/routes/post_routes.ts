import express from 'express';
import {authTestMiddleware} from '../controllers/auth_controller';
import postsController from '../controllers/posts_controller';

const router=express.Router();

router.get("/",postsController.getAll.bind(postsController));

router.get("/:id",postsController.getById.bind(postsController));

router.post("/",authTestMiddleware,postsController.createItem.bind(postsController));

export default router;