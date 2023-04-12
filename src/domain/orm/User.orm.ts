import { userEntity } from "../entities/User.entity";
import { LogSuccess, LogError } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        const userModel = userEntity();

        //Search for users
        return await userModel.find({ isDelete: false })

    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`)
    }
}

//Get User By ID
export const getUserByID = async (id: string): Promise<any> => {
    
    try {
        const userModel = userEntity();

        //Search for users by ID
        return await userModel.findById(id)

    } catch (error) {

        LogError(`[ORM ERROR]: Getting User by ID: ${error}`)

    }
}

//Delete User
export const deleteUserByID = async (id: string): Promise<any | undefined> => {
    try {
        const userModel = userEntity();

        //Delete
        return await userModel.deleteOne({ _id: id })

    } catch (error) {

        LogError(`[ORM ERROR]: Delete User by ID: ${error}`)

    }
}

//Create User
export const createUser = async (user: any): Promise<any | undefined> => {
    try {
        
        const userModel = userEntity();

        //Create
        return await userModel.create(user);

    } catch (error) {

        LogError(`[ORM ERROR]: Creating User by ID: ${error}`);

    }
}

//Update User
export const updateUserByID = async (id:string, user: any): Promise<any | undefined> => {
    try {
        const userModel = userEntity();

        return await userModel.findByIdAndUpdate(id, user);

    } catch (error) {
        LogError(`[ORM ERROR]: Update User ${id}: ${error}`);
    }
}

//Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
    try {
        const userModel = userEntity();

        //Find User by Email
        userModel.findOne({ email: auth.email }, (error: any, user: IUser) => {
            if (error) {
                //Return Error
            }
            if (!user) {
                //Return User not found
            }

            //Use Bcrypt
            const validPassword = bcrypt.compareSync(auth.password, user.password);

            if (!validPassword) {
                //Not authorized
            }

            //Create JWT
            const token = jwt.sign({ email: user.email }, 'SECRET', { expiresIn: "1h" })
        });
        return token;
        
} catch (error) {
        LogError(`[ORM ERROR]: Creating user ${error}`);
    }
}

//Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {
        const userModel = userEntity();

        return await userModel.create(user);

    } catch (error) {
        LogError(`[ORM ERROR]: Register user ${error}`);
    }
}

//Logout User
export const logoutUser = async (): Promise<any | undefined> => {
    // Pending
}