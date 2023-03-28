import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

//Swagger
import swaggerUi from "swagger-ui-express";

// Security
import cors from 'cors';
import helmet from 'helmet';

// Root Router
import rootRouter from '../routes';

// Create Express Application
const server: Express = express();

//Swagger Config and Route
server.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
            explorer: true
        }
    })
);

// Define SERVER to use "/api" and use rootRouter from 'index.ts in routes/root
// From this point on over: http://localhost:8080/api/...
server.use(
    '/api',
    rootRouter
);

// Static server
server.use(express.static('public'));

// Conection Mongo Database
mongoose.connect('mongodb://localhost:27017/codeVerification')

// Security Config
server.use(helmet());
server.use(cors());

// Content Type Config
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));

// Redirection Config http://localhost:8000/ --> ...api/
server.get('/', (req: Request, res: Response) => {
    res.redirect('/api')
})

export default server;