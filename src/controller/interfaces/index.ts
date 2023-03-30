import { BasicResponse } from "../types";

export interface IHelloController {
    getMessage(name?: string): Promise<BasicResponse>;
}

export interface IUserController {
    //Users from database
    getUsers(id?: string): Promise<any>
}