import express from "express";
import config from "config";
import mongoose from "mongoose";

import {router as authRouter} from "./routes/auth.routes.js";

// mongodb credentials 
// user: max99xam
// password asd123qweJHKH83w

const app = express();

const PORT = config.get("port") || 5000;

app.use("api/auth", import("./"))

async function start(){
    try{
       // connect to database
       await mongoose.connect(config.get("mongoUrl"), {
           useUnifiedTopology: true,
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

