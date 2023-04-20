import express, { Request, Response } from 'express';
import { AuthController } from '../controller/AuthController';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

//BCrypt from password
import bcrypt from 'bcrypt';

//Middleware
import { verifyToken } from "src/middlewares/verifyToken.middleware";

//Body Parser
import bodyParser from "body-parser";

//Middleware to read JSON in body
const jsonParser = bodyParser.json();

//Router from express
const authRouter = express.Router();

authRouter.route('/register')
    .post(jsonParser, async (req: Request, res: Response) => {
        
        let { name, email, password, age } = req.body;
        let hashedPassword = '';
        
        if (name && password && email && age) {
            //Obtain the password
            hashedPassword = bcrypt.hashSync(req.body.password, 8);
            
            const newUser: IUser = {
                name: name,
                email: email,
                password: hashedPassword,
                age: age
            }

            //Controller Instance to execute method
            const controller: AuthController = new AuthController();
            
            //Obtain a Response
            const response: any = await controller.registerUser(newUser);

            //Send to the client the response
            return res.status(200).send(response);

        }
    })


authRouter.route('/login') 
    .post(async (req: Request, res: Response) => {
        
        const { email, password } = req.body;
        
        if (email && password) {
            
            //Controller Instance to execute method
            const controller: AuthController = new AuthController();
            
            const auth: IAuth = {
                email: email,
                password: password,
            }

            //Obtain a Response
            const response: any = await controller.loginUser({email, password});

            //Send to the client the response
            return res.status(200).send(response);

        }

    })


//Export hello router
export default authRouter;