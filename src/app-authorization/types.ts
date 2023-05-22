export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    passwordRepeat: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    userId: string;
    token: string;
    expiresIn: number;
}