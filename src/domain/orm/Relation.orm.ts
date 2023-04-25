import { LogSuccess, LogError } from "../../utils/logger";
import { relationEntity } from "../entities/Relation.entity";
import { IRelation } from "../interfaces/IRelation.interface";

//Enviroment 
import dotenv from 'dotenv';
//Config ENV
dotenv.config();

/**
 * 
 * @param page 
 * @param limit 
 * @returns 
 */


export const getAllRelation = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        const relationModel = relationEntity();

        const response: any = {};

        //Search all users
        await relationModel.find({ isDeleted: false })
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((relation: IRelation[]) => {
                response.relation = relation;
            });
        
        //Count total documents in collection
        await relationModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;

    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Relations: ${error}`)
    }
}


//Get Relation By ID
export const getRelationByID = async (id: string): Promise<any> => {
    
    try {
        const relationModel = relationEntity();

        //Search relations by ID
        return await relationModel.findById(id)

    } catch (error) {

        LogError(`[ORM ERROR]: Getting Relation by ID: ${error}`)

    }
}


//Delete Relation By ID
export const deleteRelationByID = async (id: string): Promise<any | undefined> => {
    try {
        const relationModel = relationEntity();

        //Delete relations by ID
        return await relationModel.deleteOne({ _id: id })

    } catch (error) {

        LogError(`[ORM ERROR]: Delete Relation by ID: ${error}`)

    }
}


//Create New Relation
export const createRelation = async (relation: IRelation): Promise<any | undefined> => {
    try {
        
        const relationModel = relationEntity();

        //Create || Insert a new relation by User
        return await relationModel.create(relation);

    } catch (error) {

        LogError(`[ORM ERROR]: Creating Relation by ID: ${error}`);

    }
}


//Update Relation by ID
export const updateRelationByID = async (id:string, relation: IRelation): Promise<any | undefined> => {
    try {
        const relationModel = relationEntity();

        //Update a new relation by User
        return await relationModel.findByIdAndUpdate(id, relation);

    } catch (error) {
        LogError(`[ORM ERROR]: Update Relation ${id}: ${error}`);
    }
}


//Register new relation
export const registerUser = async (user: IRelation): Promise<any | undefined> => {
    try {
        const relationModel = relationEntity();

        //Create a new relation by User
        return await relationModel.create(user);

    } catch (error) {
        LogError(`[ORM ERROR]: Register user ${error}`);
    }
}
