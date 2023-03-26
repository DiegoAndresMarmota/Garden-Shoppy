import express, { Request, Response } from 'express';
import { HelloController } from '../controller/HelloController';
import { LogInfo } from '../utils/logger';

//Router from express
const helloRouter = express.Router();

//http://localhost:8080/api/hello?name=Diego/
helloRouter.route('/')
    // GET:
    .get(async (req: Request, res: Response) => {
        //Obtain a Query Param
        const name: any = req?.query?.name;
        LogInfo(`Query Param: ${name}`);
        //Controller Instance to execute method
        const controller: HelloController = new HelloController();
        //Obtain a Response
        const response = await controller.getMessage(name);
        //Send to the client the response
        return res.send(response);
    })

//Export hello router
export default helloRouter;