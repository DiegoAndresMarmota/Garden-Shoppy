import { Get, Route, Tags, Query } from 'tsoa';
import { IUserController } from './interfaces';
import { LogSuccess, LogError } from '../utils/logger';
import { BasicResponse } from './types';


//ORM - Users Collection
import { getAllUsers } from '../domain/orm/User.orm';
import { query } from 'express';

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
    /**
     * EndPoint to retrieve users
     */
    @Get("/")
    public async getUsers(@Query() id?: string): Promise<any> {
        
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/users] Get User by ID: ${id}`);
            return {
                message: `Obtaining User by ID: ${id}`
            }
        } else {
            LogSuccess('[/api/users] Get All Users Request');
            response = await getAllUsers();
        }
        return response;
    }
}