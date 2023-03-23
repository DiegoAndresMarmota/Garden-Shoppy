import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

//Configuration .env
dotenv.config();

//Create Express Application
const app: Express = express();
const port: string | number = process.env.PORT || 8000;

//Define First Route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome Node + TS')
});

//Execute App
app.listen(port, () => {
    console.log(`GardenShoppy Server: Running at http://localhost:${port}`
    );
})