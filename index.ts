import dotenv from "dotenv";
import server from './src/server';
import { LogError, LogSuccess } from "./src/utils/logger";

//Configuration .env
dotenv.config();

const port = process.env.PORT || 8000;

//Execute App
server.listen(port, () => {
    LogSuccess(`[Server ON]: Running at http://localhost:${port}/api`);
})

//Control Server-Error
server.on('error', (error) => {
    LogError(`[Server ERROR]: ${error}`)
});