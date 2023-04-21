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
        
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { name, email, password, age } = req?.body;
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
    .post(jsonParser, async (req: Request, res: Response) => {
        
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { email, password } = req?.body;
        
        if (email && password) {
            
            //Controller Instance to execute method
            const controller: AuthController = new AuthController();
            
            const auth: IAuth = {
                email: email,
                password: password,
            }

            //Obtain a Response
            const response: any = await controller.loginUser(auth);

            //Send to the client the response
            return res.status(200).send(response);

        } else {
            //Send to the client the response
            return res.status(400).send({
                message: "[ERROR - User Data Missing: No user can be registered "
            });

        }

    })

//Route Protected by Verify token middleware
authRouter.route('/me')
    .get(verifyToken, async (req: Request, res: Response) => {
        //Obtain the ID of user
        const id: any = req?.query?.id;

        if (id) {
            //Controller: Auth Controller
            const controller: AuthController = new AuthController();

            //Obtain the response fron Controller
            const response: any = await controller.userData(id)

            //If user is authorizaded:
            return res.status(200).send(response);

        } else {
            return res.status(401).send({
                message: "Invalid authorization",
            })
        }
    })

//Export hello router
export default authRouter;