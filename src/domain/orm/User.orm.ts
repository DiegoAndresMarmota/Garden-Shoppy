import { userEntity } from "../entities/User.entity";
import { LogSuccess, LogError } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//ENV
import dotenv from 'dotenv';
import { error } from "console";
import { UserResponse } from "../types/UsersResponse.type";
import { relationEntity } from "../entities/Relation.entity";
import { IRelation } from "../interfaces/IRelation.interface";
import mongoose from "mongoose";

//Config ENV
dotenv.config();

//Obtain Secret Key
const secret = process.env.SECRETKEY || 'MySecretKey';


export const getAllUsers = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        const userModel = userEntity();

        const response: any = {};

        //Search all users
        await userModel.find({ isDeleted: false })
            .select('name email age relations')
            .limit(limit)
            .skip((page - 1) * limit)
            // .projection({name: 1, email: 1, age: 1})
            .exec().then((users: IUser[]) => {
                response.users = users;
            });
        
        //pagination
        await userModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;

    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`)
    }
}

export const getRelationsFromUser = async (id: string, page: number, limit: number): Promise<any[] | undefined> => {
    try {

        const userModel = userEntity();
        const relationsModel = relationEntity();
    
        let relationsFound: IRelation[] = [];

        const response: any = {
            relations: []
        };

        await userModel.findById(id).then(async (user: IUser) => {

            response.user = user.email;

            //Create search
            const objectIds: mongoose.Types.ObjectId[] = [];
            user.relations.forEach((relationID: string) => {
                const objectID = new mongoose.Types.ObjectId(relationID);
                objectIds.push(objectID);

                
                await relationsModel.find({ "_id": { "$in": objectIds } }).then((relations: IRelation[]) => {
                    relationsFound = relations;
                });

            }) catch ((error: any) => {
                LogError(`[ORM ERROR]: Getting User from Relations: ${error}`);
            });

            response.relations = relationsFound;

            return response;

            } catch (error) {
                LogError(`[ORM ERROR]: Getting Relations all Users: ${error}`);
        }
    }
}


//Get User By ID
export const getUserByID = async (id: string): Promise<any> => {
    
    try {
        const userModel = userEntity();

        //Search for users by ID
        return await userModel.findById(id).select('name email age relations');

    } catch (error) {

        LogError(`[ORM ERROR]: Getting User by ID: ${error}`)

    }
}


//Delete User
export const deleteUserByID = async (id: string): Promise<any | undefined> => {
    try {
        const userModel = userEntity();

        //Delete
        return await userModel.deleteOne({ _id: id })

    } catch (error) {

        LogError(`[ORM ERROR]: Delete User by ID: ${error}`)

    }
}
}


//Update User
export const updateUserByID = async (id:string, user: any): Promise<any | undefined> => {
    try {
        const userModel = userEntity();

        return await userModel.findByIdAndUpdate(id, user);

    } catch (error) {
        LogError(`[ORM ERROR]: Update User ${id}: ${error}`);
    }
}


//Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
    try {
        const userModel = userEntity();

        let userFound: IUser | undefined = undefined;
        let token = undefined;

        //Check if user exists by email
        await userModel.findOneAndUpdate({ email: auth.email })
            .then((user: IUser) => {
                userFound = user;
            }).catch((error) => {
                console.error(`Error: ${error}`);
                throw new Error(`[Error]: ${error}`);
            })
        
        //Check if password is correct
        const validPassword = bcrypt.compareSync(auth.password, userFound!.password);
        
        if (!validPassword) {
            console.error(`Error: ${error}`);
            throw new Error(`[Password not valid]`);
        }

        //Generate JWT
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        token = jwt.sign({ email: userFound!.email }, secret, {
            expiresIn: "1h"
        });

        return {
            user: userFound,
            token: token,
        }
        
    } catch (error) {
        LogError(`[ORM ERROR]: Creating user ${error}`);
    }
}


//Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {
        const userModel = userEntity();

        return await userModel.create(user);

    } catch (error) {
        LogError(`[ORM ERROR]: Register user ${error}`);
    }
}

//Create User
export const createUser = async (user: IUser): Promise<any | undefined> => {
    try {
        const userModel = userEntity();

        return await userModel.create(user);

    } catch (error) {
        LogError(`[ORM ERROR]: Creating user ${error}`);
    }
}

//Logout User
export const logoutUser = async (): Promise<any | undefined> => {
    // Pending
}