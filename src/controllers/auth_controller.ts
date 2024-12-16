import {Request,Response, NextFunction} from 'express';
import userModel,{iUser} from '../models/user_model';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';

const register= async (req:Request, res:Response)=>{
    const email =req.body.email;
    const password=req.body.password;
    if (!email || !password){
        res.status(400).send("Email and password are required");
        return;
    }
    try{
        const salt=await bycrypt.genSalt(10);
        const hashedPassword=await bycrypt.hash(password,salt);
        const user=await userModel.create({
            email:email,
            password: hashedPassword
        });
        res.status(200).send(user);
        return;
    }catch(err){
        res.status(400).send(err);
        return;
    }
};

const login= async (req:Request, res:Response)=>{
    const email =req.body.email;
    const password=req.body.password;
    if (!email || !password){
        res.status(400).send("Email and password are required");
        return;
    }
    try{
        const user=await userModel.findOne({email:email});
        if (!user){
            res.status(400).send("Wrong email or password");
            return;
        }
        const validPassword=await bycrypt.compare(password,user.password);
        if (!validPassword){
            res.status(400).send("Wrong email or password");
            return;
        }
        if (!process.env.TOKEN_SECRET){
            res.status(400).send("Token secret is not defined");
            return;
        }
        const token=jwt.sign({
            _id:user._id},
            process.env.TOKEN_SECRET,
            {expiresIn:process.env.TOKEN_EXPIRATION});
        res.status(200).send({
            token:token,
            email:user.email,
            _id:user._id
        });
    }catch(err){
         res.status(400).send(err);
         return;
        };      
};

type TokenPayload={
    _id:string;
};
export const authTestMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader=req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token){
        res.status(401).send("Access denied");
        return;
    }
    if (!process.env.TOKEN_SECRET){
        res.status(400).send("Token secret is not defined");
        return;
    }
    jwt.verify(token,process.env.TOKEN_SECRET,(err,payload: TokenPayload)=>{
        if (err){
            res.status(402).send("Invalid token");
            return;
        }
        req.query.userId=payload._id;
        next();
    });
};
export default {register,login};
