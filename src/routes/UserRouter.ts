import express, { Request, Response } from 'express';
import { UserController } from '../controller/UsersController';
import { LogInfo } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
//Body Parser 
import bodyParser from 'body-parser';
import { verifyToken } from '../middlewares/verifyToken.middleware';

//Router from express
const usersRouter = express.Router();

const jsonParser = bodyParser.json();

//http://localhost:8000/api/users?id=123
usersRouter.route('/')
    // GET:
    .get(verifyToken, async (req: Request, res: Response) => {
        //Obtain a Query Param
        const id: any = req?.query?.id;

        //Pagination
        const page: any = req?.query?.page || 1;
        const limit: any = req?.query?.id  || 6;

        //Message Success
        LogInfo(`Query Param: ${id}`);

        //Controller Instance to execute method
        const controller: UserController = new UserController();

        //Obtain a Response
        const response: any = await controller.getUsers(page, limit, id )

        //Send to the client the response
        return res.status(200).send(response);

    })
    //DELETE:
    .delete(verifyToken, async (req: Request, res: Response) => { 
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
    
    //PUT:
    .put(verifyToken, async (req: Request, res: Response) => {
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

usersRouter.route('/auth/register')
    .post(async (req: Request, res: Response) => {
        
        let hashedPassword = '';
        
        if (req.body.password && req.body.password && req.body.email && req.body.age) {

            const name = req.body.name
            const email = req.body.email
            const age = req.body.age

            //Obtain the password
            hashedPassword = bcrypt.hashSync(req.body.password, 8);

            const newUser: IUser = {
                name : name,
                email: email,
                password: hashedPassword,
                age: age
            }

            //Controller Instance to execute method
            const controller: UserController = new UserController();
            
            //Obtain a Response
            const response: any = await controller.updateUser(id, user);

        }

    })

//Export hello router
export default usersRouter;