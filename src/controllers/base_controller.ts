import { Request, Response } from "express";
import { Model } from "mongoose";

export class BaseController<T>{
  model:Model<T>;
  constructor(model:Model<T>){
    this.model = model;
  }

    async getAll (req:Request , res:Response){
      const filter = {...req.query};
      try {
          const data = await this.model.find(filter as Partial<T>);
          res.status(200).send(data);
      } catch (error) {
        res.status(400).send(error.message);
      }
    };
    
  //   async getAll(req: Request, res: Response) {
  //     const filter = req.query.owner;
  //     try {
  //         if (filter) {
  //             const item = await this.model.find({ owner: filter });
  //             res.send(item);
  //         } else {
  //             const items = await this.model.find();
  //             res.send(items);
  //         }
  //     } catch (error) {
  //         res.status(400).send(error);
  //     }
  // }; 

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
    
};

const createController =<T> (model:Model<T>) => { 
  return new BaseController(model);
}
export default createController;
