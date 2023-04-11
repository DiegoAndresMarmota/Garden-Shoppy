import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa';
import { IAuthController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {

    @Post("/register")
    registerUser(user: IUser): Promise<any> {
        throw new Error('Method not implemented.');
    }

    @Post("/login")
    loginUser(auth: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    
}