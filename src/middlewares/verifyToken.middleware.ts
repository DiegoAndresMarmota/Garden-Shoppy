import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

//Config dotenv
dotenv.config();

const secret = process.env.SECRETKEY || "MySecretKey";


/**
 * 
 * @param req Original request previously middleware
 * @param res Rsponse to verifycation of JWT
 * @param next Next function to be executed
 * @returns Error of verification or next execution
 */

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    //Check header from request
    const token: any = req.headers['x-access-token'];

    //Verify if jwt is present
    if (!token) {
        return res.status(403).send({
            authenticationError: 'Failed to verify token',
            message: 'Not authorized'
        });
    }

    //Verify token obtained
    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(500).send({
                authenticationError: 'JWT verification failed',
                message: 'Failed to verify token'
            });
        }

        //Execute next function -> Protected Routes will be executed
        next();

    });
}