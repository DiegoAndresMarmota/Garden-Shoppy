import { userEntity } from "../entities/User.entity";

import { LogSuccess, LogError } from "@/utils/logger";

export const GetAllUsers = async ():Promise<any[] | undefined> => {
    try {
        const userModel = userEntity();
        return await userModel.find({ isDelete: false })
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`)
    }
}