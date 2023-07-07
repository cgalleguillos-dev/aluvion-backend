export class LoginInput {
    email: string;
    password: string;
}

export class LoginResponse {
    token: string;
}

export class SignUpInput {
    email: string;
    password: string;
    name: string;
}

export interface JwtPayload {
    email: string;
    name: string;
}
