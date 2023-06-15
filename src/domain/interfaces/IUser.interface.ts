import { IRelation } from "./IRelation.interface";

export interface IUser {
    name: string,
    email: string,
    password: string,
    age: number,
    relations: IRelation[]
}