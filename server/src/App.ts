import cors from 'cors';
import express from 'express';
import http from 'http';
import helmet from 'helmet';
import registerRoutes from './routes';
import addErrorHandler from './middleware/error-handler';
import cookieParser from 'cookie-parser';  

let corsOptions = {
    credentials: true,
    origin: ["http://localhost:3000"]
  };


// import * as mongoose from 'mongoose';
const mongoose = require("mongoose");

export default class App {
    public express: express.Application;

    public httpServer: http.Server;

    public async init(): Promise<void> {
        this.express = express();
        this.httpServer = http.createServer(this.express);
        this.middleware();
        this.routes();
        this.addErrorHandler();
        this.connectToTheDatabase();
    }

    private connectToTheDatabase() {
        const mongoUrl = 'mongodb://admin:pass@localhost:27017/dictionary';

            

        // Connect to MongoDB
        mongoose.connect(mongoUrl, {
            authSource: 'admin',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            user: "admin",
            pass: "pass",
            serverSelectionTimeoutMS: 5000,
          })
            .then(() => {
                console.log("MongoDB Connected");
            })
            .catch((err: any) => console.log(err));
        }


    /**
     * here register your all routes
     */
    private routes(): void {
        this.express.get('/', this.basePathRoute);
        this.express.get('/web', this.basePathRoute);
        registerRoutes(this.express);
    }



   

    /**
     * here you can apply your middlewares
     */
    private middleware(): void {
        // support application/json type post data
        // support application/x-www-form-urlencoded post data
        // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
        this.express.use(helmet({ contentSecurityPolicy: false }));
        this.express.use(express.json({ limit: '100mb' }));
        this.express.use(express.urlencoded({ limit: '100mb', extended: true }));
        this.express.use(cors(corsOptions));
        this.express.use(cookieParser());

        
        
    }

    private basePathRoute(request: express.Request, response: express.Response): void {
        response.json({ message : 'base path' });
    }

    private addErrorHandler(): void {
        this.express.use(addErrorHandler);
    }
}
