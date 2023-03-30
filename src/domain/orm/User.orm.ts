import { userEntity } from "../entities/User.entity";
import { LogSuccess, LogError } from "../../utils/logger";

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