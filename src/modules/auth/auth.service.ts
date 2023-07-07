import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, LoginInput, LoginResponse, SignUpInput } from './dto/auth.dto';
import { User } from '../../entities';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async login(loginInput: LoginInput): Promise<LoginResponse> {
        const user = await this.usersService.findByEmail(loginInput.email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        if (!user.validatePassword(loginInput.password)) {
            throw new Error('Usuario no encontrado');
        }
        const token = this.jwtService.sign(user.getInfoToToken(), {
            expiresIn: '1d', secret: process.env.JWT_SECRET
        });
        return {
            token
        }
    }

    async signup(signUpInput: SignUpInput): Promise<User> {
        const user = await this.usersService.findByEmail(signUpInput.email);
        if (user) {
            throw new Error('Usuario ya existe');
        }
        return await this.usersService.create(signUpInput);
    }

    async validateUser(payload: JwtPayload): Promise<User> {
        const user = await this.usersService.findByEmail(payload.email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    }

    async profile(userId: string): Promise<Partial<User>> {
        return await this.usersService.profile(userId);
    }
}
