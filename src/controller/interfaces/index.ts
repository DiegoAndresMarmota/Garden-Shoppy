import { IRelation } from "../../domain/interfaces/IRelation.interface";
import { IUser } from "../../domain/interfaces/IUser.interface";
import { BasicResponse } from "../types";


export interface IHelloController {
    getMessage(name?: string): Promise<BasicResponse>;
}


export interface IUserController {
    //Users from database
    getUsers(page: number, limit: number, id?: string): Promise<any>
    //Delete users from database
    deleteUser(id?: string): Promise<any>
    //Update user from database
    updateUser(id:string, user:any): Promise<any>
}


export interface IAuthController {
    //Register users
    registerUser(user: IUser): Promise<any>
    //Login user
    loginUser(auth: any): Promise<any>
}


export interface IRelationController {

    //Read all relations from database || get Relation By ID
    getRelation(page: number, limit: number, id?: string): Promise<any>

    //Create a new relation from database
    createRelation(relation: IRelation): Promise<any>

    //Delete relations from database
    deleteRelation(id?: string): Promise<any>

    //Update relations from database
    updateRelation(id:string, relation:IRelation): Promise<any>
}