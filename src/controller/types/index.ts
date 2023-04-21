export type BasicResponse = {
    message: string;
}

export type ErrorResponse = {
    error: string;
    message: string;
}

export type AuthResponse = {
    message: string;
    token: string;
}