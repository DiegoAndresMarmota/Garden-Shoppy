import mongoose from "mongoose";
import { IRelation } from "../interfaces/IRelation.interface";

export const relationEntity = () => {

    const relationSchema = new mongoose.Schema<IRelation>(
        {
            name: { type: String, required: true },
            description: { type: String, required: true },
            level: { type: String, required: true },
            intents: { type: Number, required: true },
            starts: { type: Number, required: true },
            creator: { type: String, required: true },
            solution: { type: Number, required: true },
            participants: { type: [], required: true },
        }
    );

    return mongoose.models.Users || mongoose.model<IRelation>('Relation', relationSchema);

};