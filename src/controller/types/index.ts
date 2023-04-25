/**
 * Basic JSON response for Controllers
 */

export type BasicResponse = {
    message: string;
}

/**
 * Basic JSON response for Controllers
 */
export type ErrorResponse = {
    error: string;
    message: string;
}

/**
 * Basic JSON response for Controllers
 */
export type AuthResponse = {
    message: string;
    token: string;
}