import { Request, Response } from "express";
import { Model } from "mongoose";

class BaseController<T>{
  model:Model<T>;
  constructor(model:Model<T>){
    this.model = model;
  }
    async getAll (req:Request , res:Response){
      const filter = {...req.query};
      try {
       // if (filter) {
          const data = await this.model.find(filter as Partial<T>);
          res.status(200).send(data);
        // } else {
        //   const data = await this.model.find();
        //   res.status(200).send(data);
        // }
      } catch (error) {
        res.status(400).send(error.message);
      }
    };
    
    async getById (req:Request , res:Response)  {
      const id = req.params.id;
      try {
        const date = await this.model.findById(id);
        if (date) {
          res.send(date);
        } else {
          res.status(404).send("item not found");
        }
      } catch (error) {
        res.status(400).send(error.message);
      }
    };
    
    async createItem (req:Request , res:Response)  {
    try {
      const data = await this.model.create(req.body);
      res.status(201).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  };
    
  async deleteItem (req:Request , res:Response) {
      const id = req.params.id;
      try{
        await this.model.findByIdAndDelete(id);
        return res.send("item deleted");
      }catch(err){
        return res.status(400).send(err); 
      } 
  };
};

const createController =<T> (model:Model<T>) => { 
  return new BaseController(model);
}
export default createController;
