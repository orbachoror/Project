import express,{Express} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRoutes from './routes/post_routes';

dotenv.config();
const app = express();

const initApp=async()=>{
        return  new Promise<Express> ((resolve,reject)=>{
            const db= mongoose.connection;
            db.on("error",(error)=>{console.error(error)});
            db.once("open", function (){
                console.log("Connected to Mongoose")
            });
            mongoose.connect(process.env.DB_CONNECT).then(()=>{
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use("/posts",postRoutes);
                    
        resolve(app);
        });
    });
};   
export default initApp;