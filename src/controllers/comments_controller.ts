import commentsModel from "../models/comments_model";
import { Request, Response } from "express";
import BaseController from "./base_controller";


const getAllComments =  (req:Request , res:Response) => {
  return BaseController.getAll(req, res, commentsModel);
}; 


const getCommentsById =  (req:Request , res:Response) => {
    return BaseController.getById(req, res, commentsModel);
  };
 
  
const createComment =  (req:Request , res:Response) => {
    return BaseController.createIteam(req, res, commentsModel);
  };

  
const deleteComment = async(req:Request , res:Response) =>{
    return BaseController.deleteItem(req, res, commentsModel);
  };


export default {
    getAllComments,
    getCommentsById,
    createComment,
    deleteComment,
    };
