import express from "express";
import config from "config";
import mongoose from "mongoose";

import authRouter from "./routes/auth.routes.js";

// mongodb credentials
// user: max99xam
// password asd123qweJHKH83w

const app = express();

const PORT = config.get("port") || 5000;

app.use("api/auth", authRouter);

async function start() {
  try {
    // connect to database
    await mongoose.connect(config.get("mongoUrl"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    // init app server
    app.listen(PORT, () => {
      console.log(`Server has been started on port: ${PORT}...`);
    });
  } catch (e) {
    console.log("Server error: ", e.message);
    process.exit(1);
  }
}

start();
