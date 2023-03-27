import express, { Express, Request, Response } from 'express';

// Security
import cors from 'cors';
import helmet from 'helmet';

// Root Router
import rootRouter from '../routes';

// Create Express Application
const server: Express = express();

// Define SERVER to use "/api" and use rootRouter from 'index.ts in routes/root
// From this point on over: http://localhost:8080/api/...
server.use(
    '/api',
    rootRouter
);

// Static server
server.use(express.static('public'));

// Conection Mongo Database

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