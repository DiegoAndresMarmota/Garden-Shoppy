import express, { Request, Response } from 'express';
import { UserController } from '../controller/UsersController';
import { LogInfo } from '../utils/logger';

//Router from express
const usersRouter = express.Router();

//http://localhost:8000/api/users?id=123
usersRouter.route('/')
    // GET:
    .get(async (req: Request, res: Response) => {
        //Obtain a Query Param
        const id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        //Controller Instance to execute method
        const controller: UserController = new UserController();
        //Obtain a Response
        const response: any = await controller.getUsers(id)
        //Send to the client the response
        return res.send(response);
    })
    //DELETE:
    .delete(async (req: Request, res: Response) => { 
        const id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        //Controller Instance to execute method
        const controller: UserController = new UserController();
        //Obtain a Response
        const response: any = await controller.deleteUser(id)
        //Send to the client the response
        return res.send(response);
    })

//Export hello router
export default usersRouter;