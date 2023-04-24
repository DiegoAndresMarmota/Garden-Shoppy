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