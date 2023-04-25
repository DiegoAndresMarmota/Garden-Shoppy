export enum PriorityLevel {
    BASIC = 'BASIC',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export interface IRelation {
    name: string;
    description: string;
    level: PriorityLevel;
    intents: number,
    starts: number,
    creator: string,
    solution: number,
    participants: string[]
}