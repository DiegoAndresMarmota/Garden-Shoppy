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
        return res.status(200).send(response);
    })
    //DELETE:
    .delete(async (req: Request, res: Response) => { 
        //Obtain a Query Param
        const id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        //Controller Instance to execute method
        const controller: UserController = new UserController();
        //Obtain a Response
        const response: any = await controller.deleteUser(id)
        //Send to the client the response
        return res.status(response.status).send(response);
    })
    //POST:
    .post(async (req: Request, res: Response) => {

        const name: any = req?.query?.name;
        const email: any = req?.query?.email;
        const age: any = req?.query?.age;

       //Controller Instance to execute method
        const controller: UserController = new UserController();
        //Obtain a Response
        const user = {
            name: name || "default name",
            email: email || 'undefault@gmail.com',
            age: age || "No age specified",
        }
        const response: any = await controller.createUser(user);
        //Send to the client the response
        return res.status(201).send(response);
    })
    //PUT:
    .put(async (req: Request, res: Response) => {
        //Obtain a Query Param
        const id: any = req?.query?.id;
        const name: any = req?.query?.id;
        const age: any = req?.query?.id;
        const email: any = req?.query?.id;
        LogInfo(`Query Param: ${id}, ${name}, ${age}, ${email}`);

        //Controller Instance to execute method
        const controller: UserController = new UserController();

        //Obtain a Response
        const user = {
            name: name,
            email: email,
            age: age,
        }

        //Obtain a Response
        const response: any = await controller.updateUser(id, user);

        //Send to the client the response
        return res.status(response.status).send(response);

    })

//Export hello router
export default usersRouter;