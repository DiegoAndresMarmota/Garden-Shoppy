import express, { Request, Response } from 'express';
import helloRouter from './HelloRouter';
import usersRouter from './UserRouter';
import { LogInfo } from '../utils/logger';

//Server Instance
const server = express();

//Router Instance
const rootRouter = express.Router();

//Activate for request to http://localhost:8000/api
rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo('GET: http://localhost:8000/api')
    res.send('Check API Restful Service');
});

//Redirections to Routers & Controller
server.use('/', rootRouter); //http://localhost:8000/api/
server.use('/hello', helloRouter); //http://localhost:8000/api/hello
//Add more routes
server.use('/users', usersRouter) //http://localhost:8000/api/users

export default server;