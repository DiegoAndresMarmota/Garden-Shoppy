import { BasicResponse } from "../types";

export interface IHelloController {
    getMessage(name?: string): Promise<BasicResponse>;
}

export interface IUserController {
    //Users from database
    getUsers(id?: string): Promise<any>
    //Delete users from database
    deleteUser(id?: string): Promise<any>
    //Create user from database
    createUser(user: any): Promise<any>
}