import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa';
import { IAuthController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';
import { IAuth } from '../domain/interfaces/IAuth.interface';
import { IUser } from '../domain/interfaces/IUser.interface';

//ORM - Users Collection
import { registerUser, loginUser, logoutUser } from '../domain/orm/User.orm';

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {

    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {

        let response: any = '';

        if (user) {
            LogSuccess(`[/api/auth/register] Register New User: ${user} `);
            await registerUser(user).then((response) => {
            LogSuccess(`[/api/auth/register] Create User: ${user}`);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            response = {
                message: `User ${user.name} created successfully`
            }
        })
        return response;
        } else {
            LogWarning('[/api/auth/register] Register needs new user');
            response = {
                message: 'Please, provide a new user',
            }
        }
        return response;  
    }

    @Post("/login")
    public async loginUser(auth: IAuth): Promise<any> {

        let response: any = '';

        if (auth) {
            LogSuccess(`[/api/auth/login] Register New User: ${auth.email} `);
            await loginUser(auth).then((response) => {
                LogSuccess(`[/api/auth/login] Login User: ${auth.email} `);
                response = {
                    message: `User ${auth.email} login successfully`,
                    token: response.token
                }
            })
            return response;

        } else {
            LogWarning('[/api/auth/login] Register needs email and password');
            response = {
                message: 'Please, provide a new email for login',
            }
        }
        return response;
    }
    
    @Post("/logout")
    public async logoutUser(): Promise < any > {
        const response: any = '',

        throw new Error(`[/api/auth/logout)
    }
}