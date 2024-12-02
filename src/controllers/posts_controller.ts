import PostModel from "../models/posts_model";
import { Request, Response } from "express";

const getAllPosts = async (req:Request , res:Response) => {
    const filter = req.query.owner;
    try {
      if (filter) {
        const posts = await PostModel.find({ owner: filter });
        res.send(posts);
      } else {
        const posts = await PostModel.find();
        res.send(posts);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  const getPostById = async (req:Request , res:Response) => {
    const postId = req.params.id;
    try {
      const post = await PostModel.findById(postId);
      if (post) {
        res.send(post);
      } else {
        res.status(404).send("Post not found");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
const createPost = async (req:Request , res:Response) => {
  const postBody = req.body;
  try {
    const post = await PostModel.create(postBody);
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
  
const deletePost = (req:Request , res:Response) =>{
    console.log("Delete a post");
    res.send("Delete a post");
  
};

export default {
    getAllPosts,
    getPostById,
    createPost,
    deletePost,
    };
