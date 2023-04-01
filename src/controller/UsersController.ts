import { Get, Route, Tags, Query, Delete, Post } from 'tsoa';
import { IUserController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';

//ORM - Users Collection
import { getAllUsers, getUserByID, deleteUserByID, createUser } from '../domain/orm/User.orm';
import { create } from 'domain';

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
            response = await getUserByID(id);
        } else {
            LogSuccess('[/api/users] Get All Users Request');
            response = await getAllUsers();
        }
        return response;
    }

    /**
     * EndPoint to delete the Users in the Collection "Users" of DB
     * @param {string} id 
     * @returns All User o User found by ID
     */

    @Delete("/")
    public async deleteUser(@Query()id?: string): Promise<any> {
        
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/users] Get User by ID: ${id}`);
            await deleteUserByID(id).then((response: any) => {
                response = {
                    message: `User By ID: ${id} deleted successfully`
                }
            })
        } else {
            LogWarning('[/api/users] Delete Users By ID Request');
            response = {
                message: "Please, provide a ID to delete"
            }
        }
        return response;
    }

    @Post("/")
    public async createUser(user: any): Promise<any> {
        
        return {
            message: `Create New User`
        }
    }
}