const express = require('express');
const app = express();
const dotenv= require("dotenv").config();
const mongoose =require("mongoose");

const initApp=async()=>{
        return  new Promise ((resolve,teject)=>{
            const db= mongoose.connection;
            db.on("error",(error)=>{console.error(error)});
            db.once("open",()=>{console.log("Connected to Mongoose")});

            mongoose
            .connect(process.env.DB_CONNECT)
            .then(()=>{
            console.log("initApp finish");
            const bodyParser = require("body-parser");
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));

            const postRoutes =require("./routes/post_routes");
            app.use("/posts",postRoutes);
                    
        resolve(app);
        });
    });
};   
module.exports = initApp;