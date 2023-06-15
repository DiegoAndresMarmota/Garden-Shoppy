import express, { Request, Response } from 'express';
import { RelationsController } from '../controller/RelationsController';
import { LogInfo } from '../utils/logger';

//Body Parser 
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

//JWT Verifier Middleware
import { verifyToken } from '../middlewares/verifyToken.middleware';
import { IRelation, PriorityLevel } from '../domain/interfaces/IRelation.interface';

//Router from express
const relationsRouter = express.Router();


//http://localhost:8000/api/users?id=123
relationsRouter.route('/')
    
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
        const controller: RelationsController = new RelationsController();

        //Obtain a Response
        const response: any = await controller.getRelation(page, limit, id )

        //Send to the client the response
        return res.status(200).send(response);
    })


    //DELETE:
    .delete(verifyToken, async (req: Request, res: Response) => { 
        //Obtain a Query Param
        const id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        //Controller Instance to execute method
        const controller: RelationsController = new RelationsController();
        //Obtain a Response
        const response: any = await controller.deleteRelation(id)
        //Send to the client the response
        return res.status(response.status).send(response);
    })
    

    //PUT:
    .put(jsonParser, verifyToken, async (req:Request, res:Response) => {
        //Obtain a Query Param
        const id: any = req?.query?.id;

        //Read from body
        const name: string = req?.body?.name;
        const description: string = req?.body?.description || "";
        const level: PriorityLevel = req?.body?.level || PriorityLevel.BASIC;
        const intents: number = req?.body?.intents || 0;
        const starts: number = req?.body?.starts || 0;
        const creator: string = req?.body?.creator;
        const solution: number = req?.body?.solution || 0;
        const participants: string[] = req?.body?.participants || [];

        if (name && description && level && intents >=0 && starts >=0 && creator && solution && participants.length >=0) {
            //Controller Instance to execute method
            const controller: RelationsController = new RelationsController();

            //Obtain a Response
            const relation: IRelation = {
                name: name,
                description: description,
                level: level,
                intents: intents,
                starts: starts,
                creator: creator,
                solution: solution,
                participants: participants
            }
            
            //Obtain a Response
            const response: any = await controller.updateRelation(id, relation);

            //Send to the client the response
            return res.status(200).send(response);
            
        } else {
            return res.status(400).send({
                message: "[ERROR] Updating Relation. Send atributes"
            });
        }
    })

    //POST
    .post(jsonParser, verifyToken, async (req: Request, res: Response) => {

        //Read from body
        const name: string = req?.body?.name;
        const description: string = req?.body?.description || "Default description";
        const level: PriorityLevel = req?.body?.level || PriorityLevel.BASIC;
        const intents: number = req?.body?.intents || 0;
        const starts: number = req?.body?.starts || 0;
        const creator: string = req?.body?.creator;
        const solution: number = req?.body?.solution || "Default";
        const participants: string[] = req?.body?.participants || [];

        if (name && description && level && intents >=0 && starts >=0 && creator && solution && participants.length >=0) {
            //Controller Instance to execute method
            const controller: RelationsController = new RelationsController();

            //Obtain a Response
            const relation: IRelation = {
                name: name,
                description: description,
                level: level,
                intents: intents,
                starts: starts,
                creator: creator,
                solution: solution,
                participants: participants
            }
            
            //Obtain a Response
            const response: any = await controller.createRelation(relation);

            //Send to the client the response
            return res.status(201).send(response);
            
        } else {
            return res.status(400).send({
                message: "[ERROR] Create a new Relation. Please, Send atributes"
            });
        }
    })

//Export Relation Router
export default relationsRouter;