import express from "express";
import config from "config";
import mongoose from "mongoose";

const app = express();
const PORT = config.get("port") || 5000;

async function start(){
    try{
       // connect to database
       await mongoose.connect(config.get("mongoUrl"), {
           useInifiedTopology: true,
           useNewUrlParser: true
       });

       // init app server
       app.listen(PORT, () => {
         console.log(`Port has been started on port: ${PORT}...`);
       });

    }catch(e){
        console.log("Server error: ", e.message);
        process.exit(1);
    }
}

start();

