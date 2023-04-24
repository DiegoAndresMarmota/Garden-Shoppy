import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa';
import { IUserController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';

//ORM - Users Collection
import { getAllUsers, getUserByID, deleteUserByID, createUser, updateUserByID } from '../domain/orm/User.orm';

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
    /**
     * EndPoint to retrieve users
     */
    @Get("/")
    public async getUsers(@Query()page: number, @Query()limit: number, @Query()id?: string): Promise<any> {
        
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/users] Get User by ID: ${id}`);
            response = await getUserByID(id);

            //Remove password after Get Response
            // response.password = '';
            
        } else {
            LogSuccess('[/api/users] Get All Users Request');
            response = await getAllUsers(page, limit);
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
            await deleteUserByID(id).then((response) => {
                response = {
                    status: 204,
                    message: `User By ID: ${id} deleted successfully`
                }
            })
        } else {
            LogWarning('[/api/users] Delete Users By ID Request');
            response = {
                status: 400,
                message: "Please, provide a ID to delete"
            }
        }
        return response;
    }


    @Put("/")
    public async updateUser(@Query()id: string, user: any): Promise<any> {
        
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/users] Update User by ID: ${id}`);
            await updateUserByID(id, user).then((response) => {
                response = {
                    message: `User By ID: ${id} updated successfully`
                }
            })
        } else {
            LogWarning('[/api/users] Updated User By ID Request');
            response = {
                message: "Please, provide a ID to updated"
            }
        }
        return response;
    }
}