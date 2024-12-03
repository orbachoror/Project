import PostModel from "../models/posts_model";
import { Request, Response } from "express";
import BaseController from "./base_controller";


const getAllPosts =  (req:Request , res:Response) => {
  return BaseController.getAll(req, res, PostModel);
}; 


const getPostById =  (req:Request , res:Response) => {
    return BaseController.getById(req, res, PostModel);
  };
 
  
const createPost =  (req:Request , res:Response) => {
    return BaseController.createIteam(req, res, PostModel);
  };

  
const deletePost = async(req:Request , res:Response) =>{
    return BaseController.deleteItem(req, res, PostModel);
  };


export default {
    getAllPosts,
    getPostById,
    createPost,
    deletePost,
    };
