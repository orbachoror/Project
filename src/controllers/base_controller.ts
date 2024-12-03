import { Request, Response } from "express";

const getAll = async (req:Request , res:Response, model:any) => {
    const filter = req.query;
    try {
      if (filter) {
        const data = await model.find(filter);
        res.send(data);
      } else {
        const data = await model.find();
        res.send(data);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
  const getById = async (req:Request , res:Response, model:any) => {
    const id = req.params.id;
    try {
      const date = await model.findById(id);
      if (date) {
        res.send(date);
      } else {
        res.status(404).send("item not found");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  
const createIteam= async (req:Request , res:Response, model:any) => {
  const data1 = req.body;
  try {
    const data = await model.create(data1);
    res.status(201).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
  
const deleteItem = async(req:Request , res:Response, model:any) =>{
    const id = req.params.id;
    try{
      await model.findByIdAndDelete(id);
      return res.send("item deleted");
    }catch(err){
      return res.status(400).send(err); 
    } 
};

export default {
    getAll,
    getById,
    createIteam,
    deleteItem,
    };
