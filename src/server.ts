import express,{Express} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRoutes from './routes/post_routes';
import commentsRoutes from './routes/comments_routes';
import authRoutes from './routes/auth_routes';



dotenv.config();
const app = express();

const initApp=async()=>{
        return  new Promise<Express> ((resolve,reject)=>{
            const db= mongoose.connection;
            db.on("error",(error)=>{console.error(error)});
            db.once("open", function (){
                console.log("Connected to Mongoose")
            });
            if (!process.env.DB_CONNECT) {  
                reject("No DB_CONNECT");
            }else{
            mongoose.connect(process.env.DB_CONNECT).then(()=>{
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use("/posts",postRoutes);  
            app.use("/comments",commentsRoutes);
            app.use("/auth",authRoutes);
            resolve(app);
            });
        }
    });
};   
export default initApp;